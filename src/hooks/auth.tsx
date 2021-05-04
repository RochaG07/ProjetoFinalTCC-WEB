import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';
import {socket} from '../services/socket';

interface Usuario {
    id: string;
    nome: string;
    email: string;
    avatar_url: string;
    username: string;
    senha: string;
    telefone: string;
    municipio: string;
    estado: string;
    trocasDisponiveis: number;
    premiumExpiracao: Date | null;
    statusPremium: string;
    possuiStatusDeAdm: boolean;
    proxTrocaDisp: Date | null;
}

interface AuthState {
    token: string;
    usuario: Usuario;
}

interface LoginCredentials {
    username: string;
    senha: string;
}

interface AuthContextData {
    usuario: Usuario;
    login(credentials: LoginCredentials): Promise<Usuario>;
    logout(): void;
    atualizaUsuario(usuario: Usuario): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

//Provider -> É um componente colocado por volta dos componentes que terão acesso ao contexto de autenticação

const AuthProvider: React.FC = ({ children }) => {
    // Os dados do usuário não são acessados diretamente do LocalStorage ao inves disso são armazenadas em um estado
    const [data, setData] = useState<AuthState>(() => {
        // Inicializa a variável utilizando uma função pois se deseja buscar o valor 
        // da variável baseado nos dados dentro do localStorage

        // Só é executado quando o usuário da um refresh na página F5

        const token = localStorage.getItem('@TCC:token');
        const usuarioJSON = localStorage.getItem('@TCC:usuario');


        if(token && usuarioJSON) {
            api.defaults.headers.authorization = `Bearer ${token}`;

            // Redireciona o usuário para página de login caso o token tenha expirado
            /*
            verify(token, jwt.secret, function(err) {
                if(err){
                    localStorage.removeItem('@TCC:token');
                    localStorage.removeItem('@TCC:usuario');

                    return {};
                }
            });
            */
           
            const usuario = JSON.parse(usuarioJSON);

            const loginData = {
                idUser: usuario.id, 
                nome: usuario.nome
            };

            //Reloga o usuário com um novo socket.id
            socket.emit('login', loginData);

            return { token, usuario };
        }

        return {} as AuthState;
    });

    const login = useCallback(async ({username, senha}) => {
        const response = await api.post('/sessoes', {
            username,
            senha
        });

        // Armazena a resposta da requisição no localstorage
        let { token, usuario, premiumAtivo, premiumExpiracao, statusPremium } = response.data;

        usuario.premiumAtivo = premiumAtivo;
        usuario.premiumExpiracao = premiumExpiracao;
        usuario.statusPremium = statusPremium;

        localStorage.setItem('@TCC:token', token);
        localStorage.setItem('@TCC:usuario', JSON.stringify(usuario));
        
        //Define automaticamente como padrão um header contendo o token de acesso do usuário logado 
        //é aplicado em todas as requisições  

        api.defaults.headers.authorization = `Bearer ${token}`;

        setData({ token, usuario });

        return usuario;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('@TCC:token');
        localStorage.removeItem('@TCC:usuario');

        //socket.disconnect();

        setData({} as AuthState);
    }, []);

    const atualizaUsuario = useCallback(
        (usuario: Usuario) => {
            localStorage.setItem('@TCC:usuario', JSON.stringify(usuario));

            setData({
                token: data.token,
                usuario,
            });
        },
        [data.token, setData]
    )

    return (
        <AuthContext.Provider value={{usuario: data.usuario, login, logout, atualizaUsuario}}>
            {children}
        </AuthContext.Provider>
    );
};



function useAuth():AuthContextData {
    const context = useContext(AuthContext);

    if(!context) {
        throw new Error('useAuth deve ser utilizado dentro de um AuthProvider');
    }

    return context;
}  

export {useAuth, AuthProvider};
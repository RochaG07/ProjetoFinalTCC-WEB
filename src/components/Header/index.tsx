import React,{ useState, useCallback, useEffect } from 'react';

import {useAuth} from '../../hooks/auth';
import { FiPower, FiBell, FiUserCheck } from 'react-icons/fi';
import { Container, HeaderContent, Profile, Aviso } from './styles';
import Countdown from 'react-countdown';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { addWeeks } from 'date-fns';
import { useHistory } from 'react-router-dom';
import api from '../../services/api';

import {socket, chatSocket} from '../../services/socket';

interface IRenderer{
    days: number,
    hours: number,
    minutes: number, 
    seconds: number, 
    completed: boolean,
}

interface IAviso{
    id: string,
    titulo: string,
    conteudo: string,
    dataEnvio: Date,
}

const Header: React.FC = ({ children, ...rest }) => {
    const [showNotificacoesMenu, setShowNotificacoesMenu] = useState(false);

    const {usuario, logout, atualizaUsuario} = useAuth();

    const history = useHistory();

    const [avisos, setAvisos] = useState<IAviso[]>([]);

    const [trocasDisponiveis, setTrocasDisponiveis] = useState<number>(usuario.trocasDisponiveis);
    const [proxTrocaDisp, setProxTrocaDisp] = useState<Date | null>(usuario.proxTrocaDisp);

    const [key, setKey] = useState<number>(0);

    useEffect(()=>{
        api.get<IAviso[]>('/admin/avisos')
        .then(response => {
            setAvisos(response.data);
        })
    }, [])

    const handleRender = ({ days, hours, minutes, seconds, completed }: IRenderer) => {
        return (
            <>
                <label htmlFor='Countdown'>Próxima troca em:</label>
                <span>{days} Dias | {hours} Horas | {minutes} Minutos | {seconds} Segundos</span>
            </>    
        );
    };

    const handleCompletion = useCallback(() => {
        //atualiza o número de trocas disponíveis e comeca nova contagem se necessário
        let proxTrocaDispAtualizada = proxTrocaDisp;

        if(trocasDisponiveis + 1 >= 3){
            proxTrocaDispAtualizada = null;

        } else {
            proxTrocaDispAtualizada = addWeeks(new Date(Date.now()), 1);
        }

        setProxTrocaDisp(proxTrocaDispAtualizada);
        setTrocasDisponiveis(trocasDisponiveis + 1);

        atualizaUsuario({
            ...usuario,
            trocasDisponiveis: trocasDisponiveis + 1,
            proxTrocaDisp: proxTrocaDispAtualizada,
        });    

        //Serve para restartar o contdown
        setKey(key + 1);
    },[setKey, key, usuario, atualizaUsuario, proxTrocaDisp, trocasDisponiveis]);


    function toggleNotificacoes():void{
        setShowNotificacoesMenu(!showNotificacoesMenu);
    };  

    function handleAdmin():void{
        history.push('/admin');
    };  

    
    function handleSair():void{
        //Reconecta do socket de chat
        chatSocket.disconnect();
        chatSocket.connect();

        //Reconectar do socket comum
        socket.disconnect();
        socket.connect();

        logout();
    };  

    return(
        <Container>
                <HeaderContent>
                    <Profile>
                        <img 
                            src={usuario.avatar_url}
                            alt={usuario.nome}
                        />
                        <div>
                            <span>Bem-vindo, </span>
                            
                            <strong>{usuario.nome}</strong>               
                        </div>

                        {
                            usuario.premiumAtivo&&
                            <div>
                                <strong>Usuário premium</strong>
                                <strong>Trocas ilimitadas</strong>
                            </div>
                        }   
                        {
                            !usuario.premiumAtivo&&
                            <div>
                                <strong>{usuario.trocasDisponiveis}/3 Trocas disponíveis</strong>
                            </div>
                        }                          
                        {
                            !usuario.premiumAtivo && proxTrocaDisp &&
                            <div>
                                <Countdown 
                                    key={key}
                                    date={proxTrocaDisp} 
                                    renderer={handleRender}
                                    onComplete={handleCompletion}
                                />
                            </div>
                        }
                    </Profile>
                    
                    <div className='icones'>
                        {
                           usuario.possuiStatusDeAdm &&
                            <button className='adm' type='button' onClick={handleAdmin}>
                                <FiUserCheck className='admIcon'/>
                            </button>    
                        }               
                    
                        <Tippy visible={showNotificacoesMenu}  content={
                            avisos.map(aviso => (
                                <Aviso key={aviso.id}><span>{'<'+aviso.dataEnvio+'>'}</span><span>{aviso.titulo}</span>: {aviso.conteudo}</Aviso>
                            ))
                        }>
                            <button className='sino' type='button' onClick={toggleNotificacoes}>
                                <FiBell />
                            </button>
                        </Tippy>

                        <button className='sair' type='button' onClick={handleSair}>
                            <FiPower />
                        </button>
                    </div>
                        
                </HeaderContent>
        </Container>
    )
};

export default Header;
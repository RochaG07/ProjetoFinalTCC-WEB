import React,{ useState, useCallback } from 'react';

import {useAuth} from '../../hooks/auth';
import { FiPower, FiBell, FiUserCheck } from 'react-icons/fi';
import { Container, HeaderContent, Profile } from './styles';
import Countdown from 'react-countdown';

import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { addWeeks } from 'date-fns';
import { useHistory } from 'react-router-dom';

interface IRenderer{
    days: number,
    hours: number,
    minutes: number, 
    seconds: number, 
    completed: boolean,
}

const Header: React.FC = ({ children, ...rest }) => {
    const [showNotificacoesMenu, setShowNotificacoesMenu] = useState(false);

    const {usuario, logout, atualizaUsuario} = useAuth();
    const history = useHistory();

    const [trocasDisponiveis, setTrocasDisponiveis] = useState<number>(usuario.trocasDisponiveis);
    const [proxTrocaDisp, setProxTrocaDisp] = useState<Date | null>(usuario.proxTrocaDisp);

    const [key, setKey] = useState<number>(0);

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
                        
                        <Tippy visible={showNotificacoesMenu}  content='TODO'>
                            <button className='sino' type='button' onClick={toggleNotificacoes}>
                                <FiBell />
                            </button>
                        </Tippy>
                       
                        <button className='sair' type='button' onClick={logout}>
                            <FiPower />
                        </button>
                    </div>
                        
                </HeaderContent>
        </Container>
    )
};

export default Header;
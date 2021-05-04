import React,{ useState, useCallback, useEffect } from 'react';

import {useAuth} from '../../hooks/auth';
import { FiPower, FiBell, FiAlertCircle } from 'react-icons/fi';
import { Container, HeaderContent, Profile, ContainerAvisoNotificacao } from './styles';
import Countdown from 'react-countdown';

import { addWeeks, isAfter, parseISO } from 'date-fns';
import api from '../../services/api';

import {socket} from '../../services/socket';
import { useToast } from '../../hooks/toast';

import { Popover } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    typography: {
        backgroundColor: '#1c2024',
        padding: 4,
        width: 400,
        border: '3px solid #131518',
    },
  }),
);
interface IRenderer{
    days: number,
    hours: number,
    minutes: number, 
    seconds: number, 
}

interface IAviso{
    id: string,
    ativo: boolean,
    titulo: string,
    conteudo: string,
    dataEnvio: Date,
}

interface INotificacao{
    id: string,
    conteudo: string,
    dataCriacao: Date,
}

const Header: React.FC = ({ children, ...rest }) => {

    const [notificacoesAnchorEl, setNotificacoesAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const [avisosAnchorEl, setAvisosAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const classes = useStyles();

    const {usuario, logout, atualizaUsuario} = useAuth();

    const [avisos, setAvisos] = useState<IAviso[]>([]);
    const [notificacoes, setNotificacoes] = useState<INotificacao[]>([]);

    const [trocasDisponiveis, setTrocasDisponiveis] = useState<number>(usuario.trocasDisponiveis);
    const [proxTrocaDisp, setProxTrocaDisp] = useState<Date | null>(usuario.proxTrocaDisp);

    const [expiracaoCancelado, SetExpiracaoCancelado] = useState<Date | null>(
        usuario.premiumExpiracao&&
        parseISO(usuario.premiumExpiracao.toString())
    );

    const [mostrarProxTrocaDisp, setMostrarProxTrocaDisp] = useState<boolean>(true);

    const [key, setKey] = useState<number>(0);
    const { addToast } = useToast();

    useEffect(()=>{
        async function loadNotificacoesEAvisos(): Promise<void>{
            api.get<{avisos: IAviso[], notificacoes: INotificacao[]}>('/usuarios/notificacoes')
            .then(response => {
                setAvisos(response.data.avisos);
                setNotificacoes(response.data.notificacoes);
            })
            .catch(err => {
                if(err.response.status === 401){
                    logout();
                }
            });
        }

        loadNotificacoesEAvisos();
    }, [logout]); 

    useEffect(()=>{
        const dataAtual = new Date(Date.now());

        if(usuario.statusPremium === 'ativo'){
            setMostrarProxTrocaDisp(false);
        }
        else if(usuario.statusPremium === 'cancelado' && expiracaoCancelado){
            setMostrarProxTrocaDisp(false);
        }
        
        if(expiracaoCancelado && isAfter(dataAtual, expiracaoCancelado)){
            SetExpiracaoCancelado(null);
            setMostrarProxTrocaDisp(true);
        }

    }, [expiracaoCancelado, usuario.statusPremium]);


    useEffect(()=>{
        socket.off('enviar notificacao');

        socket.on('enviar notificacao', ({id, conteudo}: INotificacao) => {
            addToast({
                type: 'info',
                title: conteudo,
            });

            setNotificacoes([...notificacoes, {
                id,
                conteudo,
                dataCriacao: new Date(Date.now()),
            }]);
        });
    }, [addToast, notificacoes]);

    
    useEffect(()=>{
        socket.off('enviar aviso');

        socket.on('enviar aviso', ({id, titulo,  conteudo}: IAviso) => {
            addToast({
                type: 'info',
                title: titulo,
                description: conteudo
            });

            setAvisos([...avisos, {
                id,
                titulo,
                conteudo,
                ativo: true,
                dataEnvio: new Date(Date.now()),
            }]);
        });
    }, [addToast, avisos]);
    
    const handleRender = ({days, hours, minutes, seconds}: IRenderer) => {
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

    const handleDeletarNotificacao = useCallback((id: string) => {
        api.delete(`usuarios/notificacoes/${id}`);

        setNotificacoes(notificacoes.filter(notificacao => notificacao.id !== id));
    }, [notificacoes])

    const handleDesativarAviso = useCallback((id: string) => {
        api.delete(`admin/avisos/${id}`);

        setAvisos(avisos.filter(aviso => aviso.id !== id));
    }, [avisos])

    function abrirNotificacoes(event: React.MouseEvent<HTMLButtonElement>):void{
        setNotificacoesAnchorEl(event.currentTarget);
    };  
    function fecharNotificacoes():void{
        setNotificacoesAnchorEl(null);
    };  

    function abrirAvisos(event: React.MouseEvent<HTMLButtonElement>):void{
        setAvisosAnchorEl(event.currentTarget);
    };  
    function fecharAvisos():void{
        setAvisosAnchorEl(null);
    };  


    function handleSair():void{
        //Reconecta socket
        socket.disconnect();
        socket.connect();

        logout();
    };  

    const showNotificacoesMenu = Boolean(notificacoesAnchorEl);
    const showAvisosMenu = Boolean(avisosAnchorEl);

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
                            usuario.statusPremium === 'ativo'&&
                            <div>
                                <strong>Usuário premium</strong>
                                <strong>Trocas ilimitadas</strong>
                            </div>
                        } 
                        {
                            usuario.statusPremium === 'cancelado'&& expiracaoCancelado&&
                            <div>
                                <strong>Usuário premium cancelado</strong>
                                <strong>Trocas ilimitadas até {expiracaoCancelado.toString()}</strong>
                            </div>
                        }     
                        {
                            mostrarProxTrocaDisp&&
                            <div>
                                <strong>{usuario.trocasDisponiveis}/3 Trocas disponíveis</strong>
                            </div>
                        }            
                        {
                            mostrarProxTrocaDisp && proxTrocaDisp &&
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
                        <button className='sino' type='button' onClick={abrirNotificacoes}>
                            <FiBell />
                        </button>
                        <Popover 
                            anchorEl={notificacoesAnchorEl}
                            open={showNotificacoesMenu} 
                            onClose={fecharNotificacoes}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <Typography className={classes.typography} component={'div'}>
                                {
                                notificacoes.map(notificacao => (
                                    <ContainerAvisoNotificacao key={notificacao.id} onClick={() => {
                                        handleDeletarNotificacao(notificacao.id)
                                    }}>
                                        <p id="conteudo">{notificacao.conteudo}</p>
                                        <p id="data">{notificacao.dataCriacao}</p> 
                                    </ContainerAvisoNotificacao>
                                ))
                                }
                            </Typography>
                        </Popover>

                        <button className='sino' type='button' onClick={abrirAvisos}>
                        <FiAlertCircle />
                        </button>
                        <Popover 
                            anchorEl={avisosAnchorEl}
                            open={showAvisosMenu} 
                            onClose={fecharAvisos}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <Typography className={classes.typography} component={'div'}>
                                {
                                avisos.map(aviso => (
                                    aviso.ativo&&
                                    <ContainerAvisoNotificacao key={aviso.id} onClick={() => {
                                        handleDesativarAviso(aviso.id)
                                    }}>
                                        <p id="titulo">{aviso.titulo}</p>
                                        <p id="conteudo">{aviso.conteudo}</p>
                                        <p id="data">{aviso.dataEnvio}</p> 
                                    </ContainerAvisoNotificacao>
                                ))
                                }
                            </Typography>
                        </Popover>

                        <button className='sair' type='button' onClick={handleSair}>
                            <FiPower />
                        </button>

                    </div>
                        
                </HeaderContent>
        </Container>
    )
};

export default Header;
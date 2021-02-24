import React, { useEffect, useState} from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import ModalMostrarChat from '../../components/ModalMostrarChat';

import { Container, Content, Negociacao} from './styles';
import {socket} from '../../services/socket';

import api from '../../services/api';

interface INegociacoes{
    negsCriador: INegociacao[],
    negsSolicitador: INegociacao[],
}

interface INegociacao{
    id: string,
    ativo: boolean,
    idConvite: string,  
    troca: {
        nomeJogoOfertado: string,
        nomeJogoDesejado: string,
    },
    nomeUsuarioCriador: string,
    nomeUsuarioSolicitador: string,
    idUsuarioCriador: string,
    idUsuarioSolicitador: string
}

interface IDesativarNeg{
    idNeg: string,
    tipo: 'criador' | 'solicitador',
}
interface IUsuariosDasNegsLogados {
  idUsuario: string,
  estaLogado: boolean,
}

   

const MinhasTrocas: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [idNegSelecionada, setIdNegSelecionada] = useState<string | null>();

    const [negociacoesCriador, setNegociacoesCriador] = useState<INegociacao[]>([]);
    const [negociacoesSolicitador, setNegociacoesSolicitador] = useState<INegociacao[]>([]);

    const [usuariosDasNegsLogados, setUsuariosDasNegsLogados] = useState<IUsuariosDasNegsLogados[]>([]);


    useEffect(() => {
        async function loadNegociacoes(): Promise<void> {            
            api.get<INegociacoes>('/trocas/negociacoes')
            .then(response => {
                const {negsCriador, negsSolicitador}: INegociacoes = response.data;

                setNegociacoesCriador(negsCriador);
                setNegociacoesSolicitador(negsSolicitador);

                socket.emit('verificar se usuarios estao logados',[
                    ...negsCriador.map(neg => neg.idUsuarioSolicitador),
                    ...negsSolicitador.map(neg => neg.idUsuarioCriador)
                ]);
            })
        }
        loadNegociacoes();
    }, []);

    useEffect(() => {        
        socket.off('lista de usuarios ativos das negociacoes');

        socket.on('lista de usuarios ativos das negociacoes', (data: IUsuariosDasNegsLogados[]) => {
            setUsuariosDasNegsLogados(data);
        });
        
    }, []);

    async function handleDesativarNeg({idNeg, tipo}: IDesativarNeg): Promise<void> {
        api.delete(`/trocas/negociacoes/${idNeg}`);

        if(tipo === 'criador'){
            setNegociacoesCriador(negociacoesCriador.filter(neg => neg.id !== idNeg));
        } else if (tipo === 'solicitador'){
            setNegociacoesSolicitador(negociacoesSolicitador.filter(neg => neg.id !== idNeg));
        }
    }

    async function handleAbrirChat(): Promise<void> {
        toggleModal();
    }

    async function handleSelecionarNeg(idNeg: string): Promise<void> {
        setIdNegSelecionada(idNeg);

        handleAbrirChat();
    }
    
    function toggleModal(): void {
        setModalOpen(!modalOpen);
    }

    function usuarioAtivo(idUsuario: string): boolean {
        let achou = false;

        usuariosDasNegsLogados.forEach(user => {
            //console.log(user);

            if(user.idUsuario === idUsuario && user.estaLogado){
                achou = true;
            }
        })

        return achou;
    }

    return(
        <Container>          
            <Header/> 
            <Navbar selectedPage={'negociacoes'}/>    
            <Content>

                {
                idNegSelecionada&&
                    <ModalMostrarChat
                    isOpen={modalOpen}
                    setIsOpen={toggleModal}
                    idNeg={idNegSelecionada}
                    /> 
                }

                <h1>Negociações de suas trocas</h1>
                {         
                    negociacoesCriador&&      
                    negociacoesCriador.map(neg => (
                        neg.ativo&&
                            <Negociacao key={neg.id}>
                                <h1>Negociação entre {neg.nomeUsuarioCriador} e {neg.nomeUsuarioSolicitador}</h1>
                                <h2>Troca do jogo {neg.troca.nomeJogoDesejado} pelo {neg.troca.nomeJogoOfertado}</h2>
                                {
                                    usuarioAtivo(neg.idUsuarioSolicitador)?
                                    <h2>solicitador ativo</h2>:
                                    <h2>solicitador inativo</h2>
                                }
                                <button onClick={() => {handleSelecionarNeg(neg.id)}}>Abrir chat</button>
                                <button onClick={() => handleDesativarNeg({
                                    idNeg: neg.id,
                                    tipo: 'criador'
                                })}>Desfazer negociação</button>
                            </Negociacao>
                    )) 
                }
                <h1>Negociações na qual você não criou a troca</h1>
                {         
                    negociacoesSolicitador&&      
                    negociacoesSolicitador.map(neg => (
                        neg.ativo&&
                        <Negociacao key={neg.id}>
                            <h1>Negociação entre {neg.nomeUsuarioCriador} e {neg.nomeUsuarioSolicitador}</h1>
                            <h2>Troca do jogo {neg.troca.nomeJogoDesejado} pelo {neg.troca.nomeJogoOfertado}</h2>
                            {
                                usuarioAtivo(neg.idUsuarioCriador)?
                                <h2>criador ativo</h2>:
                                <h2>criador inativo</h2>
                            }
                            <button onClick={() => {handleSelecionarNeg(neg.id)}}>Abrir chat</button>
                            <button onClick={() => handleDesativarNeg({
                                idNeg: neg.id,
                                tipo: 'solicitador'
                            })}>Desfazer negociação</button>
                        </Negociacao>
                    )) 
                }
            </Content>
        </Container>
    )

};

export default MinhasTrocas;
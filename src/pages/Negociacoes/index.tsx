import React, { useEffect, useState} from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import ModalMostrarChat from '../../components/ModalMostrarChat';

import { Container, Content, Negociacao} from './styles';

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
}

interface IDesativarNeg{
    idNeg: string,
    tipo: string,
}

const MinhasTrocas: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [negociacoesCriador, setNegociacoesCriador] = useState<INegociacao[]>([]);
    const [negociacoesSolicitador, setNegociacoesSolicitador] = useState<INegociacao[]>([]);

    useEffect(() => {

        async function loadNegociacoes(): Promise<void> {            
            api.get<INegociacoes>('/trocas/negociacoes')
            .then(response => {
                const {negsCriador, negsSolicitador}: INegociacoes = response.data;

                setNegociacoesCriador(negsCriador);
                setNegociacoesSolicitador(negsSolicitador);
            })
        }
    
        loadNegociacoes();
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
    
    function toggleModal(): void {
        setModalOpen(!modalOpen);
    }

    return(
        <Container>          
            <Header/> 
            <Navbar/>    
            <Content>
                    <ModalMostrarChat
                        isOpen={modalOpen}
                        setIsOpen={toggleModal}
                    /> 
                <h1>Negociações de suas trocas</h1>
                {         
                    negociacoesCriador&&      
                    negociacoesCriador.map(neg => (
                        neg.ativo&&
                        <Negociacao key={neg.id}>
                            <h1>Negociação entre {neg.nomeUsuarioCriador} e {neg.nomeUsuarioSolicitador}</h1>
                            <h2>Troca do jogo {neg.troca.nomeJogoDesejado} pelo {neg.troca.nomeJogoOfertado}</h2>
                            <button onClick={handleAbrirChat}>Abrir chat</button>
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
                            <button onClick={handleAbrirChat}>Abrir chat</button>
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
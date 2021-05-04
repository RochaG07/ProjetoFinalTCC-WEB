import React, { useEffect, useState} from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import ModalMostrarChat from '../../components/ModalMostrarChat';

import { Container, Content, Negociacao} from './styles';
import { FiX } from 'react-icons/fi';

import { confirmAlert } from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css'

import api from '../../services/api';
import ConfirmAlert from '../../components/ConfirmAlert';

interface INegociacoes{
    negsCriador: INegociacao[],
    negsSolicitador: INegociacao[],
}

export interface INegociacao{
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


const MinhasTrocas: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [NegociacaoSelecionada, setNegociacaoSelecionada] = useState<INegociacao | null>();

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
        confirmAlert({
            customUI: ({ onClose }) => {
                return(
                    <ConfirmAlert 
                        descricao='Realmente deletar esta negociação?'
                        onClose={onClose} 
                        yesFunction={()=>{
                            api.delete(`/trocas/negociacoes/${idNeg}`);

                            if(tipo === 'criador'){
                                setNegociacoesCriador(negociacoesCriador.filter(neg => neg.id !== idNeg));
                            } else if (tipo === 'solicitador'){
                                setNegociacoesSolicitador(negociacoesSolicitador.filter(neg => neg.id !== idNeg));
                            }       
                            
                            onClose();
                        }}
                    />
                );           
            }
        });
    }

    async function handleAbrirChat(): Promise<void> {
        toggleModal();
    }

    async function handleSelecionarNeg(neg: INegociacao): Promise<void> {
        setNegociacaoSelecionada(neg);

        handleAbrirChat();
    }
    
    function toggleModal(): void {
        setModalOpen(!modalOpen);
    }

    return(
        <Container>          
            <Header/> 
            <Navbar selectedPage={'negociacoes'}/>    
            <Content>

                {
                NegociacaoSelecionada&&
                    <ModalMostrarChat
                    isOpen={modalOpen}
                    setIsOpen={toggleModal}
                    negociacao={NegociacaoSelecionada}
                    /> 
                }
                {         
                    negociacoesCriador&&      
                    negociacoesCriador.map(neg => (
                        neg.ativo&&
                            <Negociacao key={neg.id}>
                                <div className='titulo'>
                                    <h1>Negociação entre {neg.nomeUsuarioCriador} e {neg.nomeUsuarioSolicitador}</h1>
                                    <div className='icones'>
                                        <button onClick={() => handleDesativarNeg({
                                            idNeg: neg.id,
                                            tipo: 'criador'
                                            })}>
                                            <FiX className="excluir"/>
                                        </button> 
                                    </div>
                                </div>

                                <h2 className='descricao'>Troca do jogo {neg.troca.nomeJogoDesejado} pelo {neg.troca.nomeJogoOfertado}</h2>

                                <button onClick={() => {handleSelecionarNeg(neg)}}>Abrir chat</button>
                            </Negociacao>
                    )) 
                }
                {         
                    negociacoesSolicitador&&      
                    negociacoesSolicitador.map(neg => (
                        neg.ativo&&
                            <Negociacao key={neg.id}>
                                <div className='titulo'>
                                    <h1>Negociação entre {neg.nomeUsuarioCriador} e {neg.nomeUsuarioSolicitador}</h1>
                                    <div className='icones'>
                                        <button className='excluir' onClick={() => handleDesativarNeg({
                                            idNeg: neg.id,
                                            tipo: 'solicitador'
                                            })}>
                                            <FiX />
                                        </button>
                                    </div>
                                </div>

                                <h2 className='descricao'>Troca do jogo {neg.troca.nomeJogoDesejado} pelo {neg.troca.nomeJogoOfertado}</h2>

                                <button onClick={() => {handleSelecionarNeg(neg)}}>Abrir chat</button>
                            </Negociacao>
                    )) 
                }
            </Content>
        </Container>
    )

};

export default MinhasTrocas;
import React, { useEffect, useState} from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { FiInbox, FiX } from 'react-icons/fi';

import { Container, Content, Troca} from './styles';

import ModalConvites from '../../components/ModalConvites';
import { Badge } from '@material-ui/core';

import { confirmAlert } from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css'
import ConfirmAlert from '../../components/ConfirmAlert';

import api from '../../services/api';

interface ITrocaENumDeConvites{
    troca: ITroca,
    convitesNaoRespondidos: number,
}

interface ITroca {
    id: string,
    descricao: string,
    ativo: boolean,
    nomeJogoOfertado: string,
    nomeJogoDesejado: string,
    urlDaCapaJogoOfertado: string,
    urlDaCapaJogoDesejado: string,
    nomeConsoleJogoOfertado: string,
    nomeConsoleJogoDesejado: string,
    estado: string,
    municipio: string,
}

interface IMostrarConvites{
    idTroca: string,
}

const Negociacoes: React.FC = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [idTrocaSelecionada, setIdTrocaSelecionada] = useState<string | null>();

    const [trocas, setTrocas] = useState<ITrocaENumDeConvites[]>([]);



    useEffect(() => {
        async function loadTrocas(): Promise<void> {
            api.get<ITrocaENumDeConvites[]>('/trocas/proprias')
            .then(response => {
                setTrocas(response.data);
            })
        }

        loadTrocas();
    }, []);

    async function handleDesativarTroca(idTroca: string): Promise<void> {
        confirmAlert({
            customUI: ({ onClose }) => {
              return(
                <ConfirmAlert 
                    descricao='Realmente deletar esta troca?'
                    onClose={onClose} 
                    yesFunction={()=>{
                        api.delete(`/trocas/${idTroca}`);

                        setTrocas(trocas.filter(troca => troca.troca.id !== idTroca));
            
                        onClose();
                    }}
                />
              );
            }
        });
    }
    
    

    function handleMostrarConvites({idTroca}: IMostrarConvites): void {
        setIdTrocaSelecionada(idTroca);

        toggleModal();
    }

    function toggleModal(): void {
        setModalOpen(!modalOpen);
    }

    function reduzNumDeConvitesNaoRespondidos(idTroca: string): void {
        let trocaAlvo = trocas.find(troca => (troca.troca.id === idTroca));

        if(trocaAlvo){
            trocaAlvo.convitesNaoRespondidos--;
        }
    }
    
    return(
        <Container>          
            <Header/> 
            <Navbar selectedPage={'minhas-trocas'}/>  
            <Content>
            {        
                idTrocaSelecionada &&   
                <ModalConvites
                    isOpen={modalOpen}
                    setIsOpen={toggleModal}
                    idTroca={idTrocaSelecionada}
                    reduzNumDeConvitesNaoRespondidos={reduzNumDeConvitesNaoRespondidos}
                /> 
            }
            {
                trocas &&
                trocas.map(troca => (
                    troca.troca.ativo &&
                    <Troca  key={troca.troca.id}>
                        <div className='capas'>
                            <img src={troca.troca.urlDaCapaJogoOfertado} alt={troca.troca.nomeJogoOfertado} />
                            <img src={troca.troca.urlDaCapaJogoDesejado} alt={troca.troca.nomeJogoDesejado} />
                        </div>

                        <div className='specJogo'>
                            <h1>{troca.troca.nomeJogoOfertado}</h1>
                            <p>{troca.troca.nomeConsoleJogoOfertado}</p>
                            <p id='por'>por</p>
                            <h1>{troca.troca.nomeJogoDesejado}</h1>
                            <p>{troca.troca.nomeConsoleJogoDesejado}</p>
                        </div>

                        <div className='icones'>
                            <button className='excluir' onClick={() => handleDesativarTroca(troca.troca.id)}>
                                <FiX />
                            </button>

                            <Badge badgeContent={troca.convitesNaoRespondidos} color="secondary" invisible={modalOpen}>
                                <button className='convites' onClick={() => handleMostrarConvites({
                                    idTroca: troca.troca.id,
                                    })}>
                                    <FiInbox/>
                                </button>
                            </Badge>

                            <p>{troca.troca.estado} - {troca.troca.municipio}</p>
                        </div>
                    </Troca>
                ))
            }
            </Content>
        </Container>
    )

};

export default Negociacoes;
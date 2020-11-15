import React, { useEffect, useState} from 'react';

import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { FiArrowRightCircle } from 'react-icons/fi';


import { Container, Content, Troca} from './styles';

import api from '../../services/api';
import ModalTrocaDisponivel from '../../components/ModalTrocaDisponivel';

interface ITroca{
    id: string,
    descricao: string,
    ativo: boolean,
    nomeJogoOfertado: string,
    nomeJogoDesejado: string,
    urlDaCapaJogoOfertado: string,
    urlDaCapaJogoDesejado: string,
    nomeConsoleJogoOfertado: string,
    nomeConsoleJogoDesejado: string,
}

export interface IHandleEnviarConvite{
    troca: ITroca,
    mensagem: string,
}

const NovaTroca: React.FC = () => {

    const { addToast } = useToast();

    const [modalOpen, setModalOpen] = useState(false);
    const [trocas, setTrocas] = useState<ITroca[]>([]);
    const [trocaSelecionada, setTrocaSelecionada] = useState<ITroca>();

    useEffect(() => {
        async function loadTrocas(): Promise<void> {
            api.get<ITroca[]>('/trocas')
            .then(respose => {
                setTrocas(respose.data);
            })
        }

        loadTrocas();
    }, []);

    async function handleEnviarConvite(
        data: IHandleEnviarConvite,
      ): Promise<void> {
        api.post('/trocas/convites', {
            mensagem: data.mensagem,
            idTroca: data.troca.id,
        })
        .then(() => {
            addToast({
                type: "success",
                title: "Convite enviado",
            });
        })
        .catch((err) => {
            console.log(err);

            addToast({
                type: 'error',
                title: 'Erro no envio de convite',
                description: 'Só é possivel enviar um convite por troca'
            });

        });
    }

    async function handleSelecionarTroca(troca: ITroca): Promise<void> {
        setTrocaSelecionada(troca);
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
                {        
                trocaSelecionada &&   
                    <ModalTrocaDisponivel
                        isOpen={modalOpen}
                        setIsOpen={toggleModal}
                        handleEnviarConvite={handleEnviarConvite}
                        trocaSelecionada={trocaSelecionada}
                    /> 
                }
                {
                    trocas &&
                    trocas.map(troca => (
                        <Troca key={troca.id} onClick={() => handleSelecionarTroca(troca)}>
                            <div className='specJogo'>
                                <h1>{troca.nomeJogoOfertado}</h1>
                                <p>{troca.nomeConsoleJogoOfertado}</p>
                            </div>
        
                            <div className='capas'>
                                <img src={troca.urlDaCapaJogoOfertado} alt={troca.nomeJogoOfertado} />
                                <FiArrowRightCircle/>
                                <img src={troca.urlDaCapaJogoDesejado} alt={troca.nomeJogoDesejado} />
                            </div>
        
                            <div className='specJogo'>
                                <h1>{troca.nomeJogoDesejado}</h1>
                                <p>{troca.nomeConsoleJogoDesejado}</p>
                            </div>
                        </Troca>
                    ))
                }
            </Content>
        </Container>
    )

};

export default NovaTroca;
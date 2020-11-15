import React, { useCallback, useEffect, useState} from 'react';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { FiArrowRightCircle } from 'react-icons/fi';

import { Container, Content, Troca, Convites} from './styles';

import api from '../../services/api';

interface ITrocaComConvites{
    troca: ITroca,
    convites: IConvite[],
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
  }

interface IConvite {
    id: string,
    mensagem: string,
    foiAceito: boolean,
    dataEnvio: Date,
    dataResposta: Date,
    idUser_solicitador: string,
    nome_solicitador: string,
}

interface IResponderConvite{
    e: any,
    respostaAoConvite: string,
}

const Negociacoes: React.FC = () => {
    const [trocasComConvites, setTrocasComConvites] = useState<ITrocaComConvites[]>([]);

    useEffect(() => {
        async function loadTrocas(): Promise<void> {
            api.get<ITrocaComConvites[]>('/trocas/proprias')
            .then(response => {
                setTrocasComConvites(response.data);
            })
        }

        loadTrocas();
    }, []);

    const handleResposta = useCallback(
        async (data: IResponderConvite) => {
            const stringCompleta: string = data.e.value;

            const barPosition = stringCompleta.search('/');

            const idConvite = stringCompleta.substr(0, barPosition);
            const idTroca = stringCompleta.substr(barPosition + 1, stringCompleta.length);

            await api.put('/trocas/convites', {
                respostaAoConvite: data.respostaAoConvite,
                idConvite
            });
            
            // Remove o convite da lista
            const novasTrocas = trocasComConvites.map(troca => {
                if(troca.troca.id === idTroca){
                    const novosConvites: IConvite[] = troca.convites.filter(convite => convite.id !== idConvite);
                    return({
                        troca: troca.troca,
                        convites: novosConvites,
                    });
                } else {
                    return troca;       
                }
            })

            setTrocasComConvites(novasTrocas);
    }, [trocasComConvites]);

    async function handleDesativarTroca(idTroca: string): Promise<void> {
        api.delete(`/trocas/${idTroca}`);

        setTrocasComConvites(trocasComConvites.filter(troca => troca.troca.id !== idTroca));
    }
    
    return(
        <Container>          
            <Header/> 
            <Navbar/>    
            <Content>
                {
                    trocasComConvites &&
                    trocasComConvites.map(trocaComConvites => (
                        trocaComConvites.troca.ativo &&
                        <React.Fragment key={trocaComConvites.troca.id}>
                        <Troca  key={trocaComConvites.troca.id}>
                            <div className='capas'>
                                <img src={trocaComConvites.troca.urlDaCapaJogoOfertado} alt={trocaComConvites.troca.nomeJogoOfertado} />
                                <FiArrowRightCircle/>
                                <img src={trocaComConvites.troca.urlDaCapaJogoDesejado} alt={trocaComConvites.troca.nomeJogoDesejado} />
                            </div>
                            <div className='specJogo'>
                                <h1>{trocaComConvites.troca.nomeJogoOfertado}</h1>
                                <p>{trocaComConvites.troca.nomeConsoleJogoOfertado}</p>
                            </div>
                            <div className='specJogo'>
                                <h1>{trocaComConvites.troca.nomeJogoDesejado}</h1>
                                <p>{trocaComConvites.troca.nomeConsoleJogoDesejado}</p>
                            </div>
                            <button onClick={() => handleDesativarTroca(trocaComConvites.troca.id)}>Excluir troca</button>
                        </Troca>
                            {
                                trocaComConvites.convites.map(convite => (
                                    convite.foiAceito === null &&
                                    <Convites key={convite.id}>
                                        <h1>Convite de {convite.nome_solicitador}</h1>
                                        <p>{convite.mensagem}</p>
                                        <button 
                                        type="button" 
                                        value={convite.id+'/'+trocaComConvites.troca.id}
                                        onClick={(e) => handleResposta({
                                            e: e.target,
                                            respostaAoConvite: 'aceitar',
                                        })}>
                                            Aceitar
                                        </button>
                                        <button 
                                        type="button" 
                                        value={convite.id+'/'+trocaComConvites.troca.id}
                                        onClick={(e) => handleResposta({
                                            e: e.target,
                                            respostaAoConvite: 'recusar',
                                        })}>
                                            Recusar
                                        </button>
                                    </Convites>
                                ))
                            }
                        </React.Fragment>
                    ))
                }
            </Content>
        </Container>
    )

};

export default Negociacoes;
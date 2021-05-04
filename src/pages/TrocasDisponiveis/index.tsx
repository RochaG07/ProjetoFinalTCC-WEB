import React, { useEffect, useRef, useState} from 'react';

import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { Container, Content, Troca, Filtro} from './styles';

import api from '../../services/api';
import ModalTrocaDisponivel from '../../components/ModalTrocaDisponivel';
import Select from '../../components/Select';
import { FormHandles } from '@unform/core';
import Button from '../../components/Button';
import {socket} from '../../services/socket';

export interface ITroca{
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
    idUser: string,
    username: string,
}

export interface IHandleEnviarConvite{
    troca: ITroca,
    mensagem: string,
}

interface IOptions{
    label: string,
    value: string,
    id: string,
}

interface IInfoIBGE{
    nome: string,
    id: string,
}

interface IFiltro{
    estado: string | undefined, 
    municipio: string | undefined, 
    nomeJogoOfertado: string | undefined, 
    nomeJogoDesejado: string | undefined, 
    nomeConsoleJogoOfertado: string | undefined, 
    nomeConsoleJogoDesejado: string | undefined
}
interface IJogo{
    id: string,
    nome: string,
    capa_url: string,
    consoles: string[],
};
interface IOptionsJogos{
    label: string,
    value: string,
    capa_url: string,
    consoles: string[]
}

const NovaTroca: React.FC = () => {
    const { addToast } = useToast();

    const [modalOpen, setModalOpen] = useState(false);
    const [trocas, setTrocas] = useState<ITroca[]>([]);
    const [trocasSemFiltro , setTrocasSemFiltro] = useState<ITroca[]>([]);

    const [trocaSelecionada, setTrocaSelecionada] = useState<ITroca>();

    const formRef = useRef<FormHandles>(null);

    //useState do filtro de jogos/consoles
    const [optionsJogos , setOptionsJogos] = useState<IOptionsJogos[]>([]);

    const [optionsConsolesDoJogoDesejado, setOptionsConsolesDoJogoDesejado] = useState<IOptions[]>([]);
    const [optionsConsolesDoJogoOfertado, setOptionsConsolesDoJogoOfertado] = useState<IOptions[]>([]);

    const [keyConsolesDesejados, setKeyConsolesDesejados] = useState<string | null>();
    const [keyConsolesOfertados, setKeyConsolesOfertados] = useState<string | null>();

    //useState do filtro de estados/municipios
    const [optionsEstados, setOptionsEstados] = useState<IOptions[]>([]);
    const [optionsMunicipios, SetOptionsMunicipios] = useState<IOptions[]>([]);
    const [keyMunicipio, setKeyMunicipio] = useState<string | null>();

    useEffect(() => {
        async function loadTrocas(): Promise<void> {
            api.get<ITroca[]>('/trocas')
            .then(response => {
                setTrocasSemFiltro(response.data);
                setTrocas(response.data);
            })
        }


        async function loadJogos(): Promise<void> {
            api.get<IJogo[]>('/jogos')
            .then(response => {
                setOptionsJogos(response.data.map( jogo => ({
                        label: jogo.nome,
                        value: jogo.nome,
                        capa_url: jogo.capa_url,
                        consoles: jogo.consoles,
                })));
            })  
        }

        async function loadEstados(): Promise<void> {
            api.get<IInfoIBGE[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
            .then(response => {            
                setOptionsEstados(response.data.map(item => ({
                    label: item.nome,
                    value: item.nome,
                    id: item.id,
                })))
            })
        }

        loadTrocas();

        loadEstados();

        loadJogos();
    }, []);

    async function handleEnviarConvite(
        data: IHandleEnviarConvite,
      ): Promise<void> {
        api.post('/trocas/convites', {
            mensagem: data.mensagem,
            idTroca: data.troca.id,
        })
        .then(response => {
            return api.post('/usuarios/notificacoes', {
                conteudo: "Uma troca sua recebeu um convite!",
                idUserAlvo: response.data.troca.idUser,
            })
        })
        .then(response => {
            socket.emit('apresentar nova notificacao', {
                id: response.data.id,
                conteudo: response.data.conteudo,
                idUserAlvo: response.data.idUser,
            });

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

    async function handleSelecionarEstado(estadoSelecionado: any): Promise<void> {
        if(estadoSelecionado){
            const id = estadoSelecionado.id;

            setKeyMunicipio(`key_municipio_${id}`);
    
            api.get<IInfoIBGE[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
            .then(response => {            
                SetOptionsMunicipios(response.data.map(item => ({
                    id: item.id,
                    label: item.nome,
                    value: item.nome,
                })))
            })
        } else {
            //Elimina as opções de municipio caso o usuário tenha retirado o filtro de cidade
            SetOptionsMunicipios([]);

            //Elimina o municipio selecionado caso o usuário tenha retirado o filtro de cidade
            setKeyMunicipio(`key_municipio_vazio`);
        }
    }

    async function handleSelecionarJogoOfertado(jogoSelecionado: any): Promise<void> {
        if(jogoSelecionado){
            setKeyConsolesOfertados(`key_ofert_${jogoSelecionado.value}`);

            setOptionsConsolesDoJogoOfertado(jogoSelecionado.consoles.map((cons: string) => ({
                label: cons,
                value: cons,
            })));
        } else {
            setOptionsConsolesDoJogoOfertado([]);

            setKeyConsolesOfertados(`key_ofert_vazio`);
        } 
    }

    async function handleSelecionarJogoDesejado(jogoSelecionado: any): Promise<void> {
        if(jogoSelecionado){
            setKeyConsolesDesejados(`key_desej_${jogoSelecionado.value}`);

            setOptionsConsolesDoJogoDesejado(jogoSelecionado.consoles.map((cons: string) => ({
                label: cons,
                value: cons,
            })));
        } else {
            setOptionsConsolesDoJogoDesejado([]);

            setKeyConsolesDesejados(`key_desej_vazio`);
        } 
    }
   
    async function handleAplicarFiltros(data: IFiltro): Promise<void> {

        api.get<ITroca[]>(`/trocas?estado=${data.estado}&municipio=${data.municipio}&nomeJogoOfertado=${data.nomeJogoOfertado}&nomeConsoleJogoOfertado=${data.nomeConsoleJogoOfertado}&nomeJogoDesejado=${data.nomeJogoDesejado}&nomeConsoleJogoDesejado=${data.nomeConsoleJogoDesejado}
        `)
        .then(respose => {
            setTrocas(respose.data);
        })
    }

    async function handleRemoverFiltros(): Promise<void> {
        setTrocas(trocasSemFiltro);
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
            <Navbar selectedPage='trocas-disponiveis'/>   
            <Filtro ref={formRef} onSubmit={handleAplicarFiltros}>

                <div className='selects'>
                    <Select 
                        placeholder="Estado"
                        name="estado"
                        options={optionsEstados} 
                        onChange={(estadoSelecionado: any) => handleSelecionarEstado(estadoSelecionado)}
                        isClearable={true}

                    />
                    <Select 
                        placeholder="Município"
                        name="municipio"
                        options={optionsMunicipios} 
                        key={keyMunicipio}
                        isClearable={true}
                    />
                </div>
                <div className='selects'>
                    <Select 
                        placeholder="Jogo ofertado"
                        name="nomeJogoOfertado" 
                        options={optionsJogos} 
                        onChange={(jogoSelecionado: any) => handleSelecionarJogoOfertado(jogoSelecionado)}
                        isSearchable={true}
                        isClearable={true}
                    />
                    <Select 
                        placeholder="consoles"
                        name="nomeConsoleJogoOfertado"
                        options={optionsConsolesDoJogoOfertado} 
                        key={keyConsolesOfertados}
                        isClearable={true}
                    />
                </div>
                <div className='selects'>
                    <Select 
                        placeholder="Jogo desejado"
                        name="nomeJogoDesejado" 
                        options={optionsJogos} 
                        onChange={(jogoSelecionado: any) => handleSelecionarJogoDesejado(jogoSelecionado)}
                        isSearchable={true}
                        isClearable={true}
                    />
                    <Select 
                        placeholder="consoles"
                        name="nomeConsoleJogoDesejado" 
                        options={optionsConsolesDoJogoDesejado} 
                        key={keyConsolesDesejados}
                        isClearable={true}
                    />
                </div>
                <div  className='botoes'>
                    <Button type='submit'>Aplicar Filtros</Button>
                    <Button type='button' onClick={handleRemoverFiltros}>Remover Filtros</Button>
                </div>
            </Filtro>

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
                        troca.ativo &&
                        <Troca key={troca.id} onClick={() => handleSelecionarTroca(troca)}>
                            <div className='capas'>
                                <img src={troca.urlDaCapaJogoOfertado} alt={troca.nomeJogoOfertado} />
                                <img src={troca.urlDaCapaJogoDesejado} alt={troca.nomeJogoDesejado} />
                            </div>

                            <div className='specJogo'>
                                <h1>{troca.nomeJogoOfertado}</h1>
                                <p>{troca.nomeConsoleJogoOfertado}</p>
                                <p id='por'>por</p>
                                <h1>{troca.nomeJogoDesejado}</h1>
                                <p>{troca.nomeConsoleJogoDesejado}</p>
                            </div>


                            <p>{troca.estado} - {troca.municipio}</p>
                        </Troca>
                    ))
                }
            </Content>
        </Container>
    )

};

export default NovaTroca;
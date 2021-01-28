import React, { useRef, useCallback, useEffect, useState} from 'react';

import { Form } from "@unform/web";

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Select from '../../components/Select';
import Button from '../../components/Button';
import Input from '../../components/Input';

import * as Yup from 'yup';

import { Container, Content, Capas, Ofertado, Desejado} from './styles';

import api from '../../services/api';

import { addWeeks } from 'date-fns';
import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { useHistory } from 'react-router-dom';

import capaPlaceholder from '../../assets/placeholder-image.png';

interface IJogo{
    id: string,
    nome: string,
    capa_url: string,
    consoles: string[],
};

interface IOptions{
    label: string,
    value: string,
}

interface IOptionsJogos{
    label: string,
    value: string,
    capa_url: string,
    consoles: string[]
}

const TrocasDisponiveis: React.FC = () => {
    const { usuario, atualizaUsuario } = useAuth();
    const { addToast } = useToast();

    const [optionsJogos , setOptionsJogos] = useState<IOptionsJogos[]>([]);

    const [optionsConsolesDoJogoDesejado, setOptionsConsolesDoJogoDesejado] = useState<IOptions[]>([]);
    const [optionsConsolesDoJogoOfertado, setOptionsConsolesDoJogoOfertado] = useState<IOptions[]>([]);

    const [URLcapaJogoDesejadoSelecionado, setURLcapaJogoDesejadoSelecionado] = useState<string | null>();
    const [URLcapaJogoOfertadoSelecionado, setURLcapaJogoOfertadoSelecionado] = useState<string | null>();

    const [keyConsolesDesejados, setKeyConsolesDesejados] = useState<string | null>();
    const [keyConsolesOfertados, setKeyConsolesOfertados] = useState<string | null>();

    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    useEffect(() => {
        async function loadJogos(): Promise<void> {
            api.get<IJogo[]>('/jogos')
            .then(response => {
                setOptionsJogos(response.data.map( jogo => ({
                        label: jogo.nome,
                        value: jogo.id,
                        capa_url: jogo.capa_url,
                        consoles: jogo.consoles,
                })));
            })  
        }

        loadJogos();
    }, []);

    //Utiliza como base o array dos jogos preenchido anteriormente e 
    //forma um novo com o formato pedido pelo react-select  

    const handleSubmit = useCallback(async (formData) => {

        const data = {
            idJogoOfertado: formData.jogoOfertado,
            idJogoDesejado: formData.jogoDesejado,
            consoleJogoOfertado: formData.consolesDoJogoDesejado,
            consoleJogoDesejado: formData.consolesDoJogoDesejado,
            descricao: formData.descricao,
        }
        
        try{
            const schema = Yup.object().shape({
                idJogoOfertado: Yup.string().required('Obrigatório'),
                idJogoDesejado: Yup.string().required('Obrigatório'),
                consoleJogoOfertado: Yup.string().required('Obrigatório'),
                consoleJogoDesejado: Yup.string().required('Obrigatório'),
                descricao: Yup.string(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });
            
            await api.post('/trocas', data);

            if(!usuario.premiumAtivo){
                let proxTrocaDisp = usuario.proxTrocaDisp;

                if(!proxTrocaDisp){
                    proxTrocaDisp = addWeeks(new Date(Date.now()), 1);
                }
    
                atualizaUsuario({
                    ...usuario,
                    trocasDisponiveis: usuario.trocasDisponiveis - 1,
                    proxTrocaDisp,
                });        
            }

            history.push('/minhas-trocas');
        } catch (err) {
            if(err instanceof Yup.ValidationError) {

                const errors = getValidationErrors(err);

                formRef.current?.setErrors({errors});

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro',
                description: 'Ocorreu um erro ao criar troca'
            });
        }
    },[addToast, history, atualizaUsuario, usuario])

    async function handleJogoOfertado(jogoSelecionado: any): Promise<void> {
        setKeyConsolesOfertados(`key_ofert_${jogoSelecionado.value}`);

        setURLcapaJogoOfertadoSelecionado(jogoSelecionado.capa_url);

        setOptionsConsolesDoJogoOfertado(jogoSelecionado.consoles.map((cons: string) => ({
            label: cons,
            value: cons,
        })));
    }

    async function handleJogoDesejado(jogoSelecionado: any): Promise<void> {
        setKeyConsolesDesejados(`key_desej_${jogoSelecionado.value}`);

        setURLcapaJogoDesejadoSelecionado(jogoSelecionado.capa_url);

        setOptionsConsolesDoJogoDesejado(jogoSelecionado.consoles.map((cons: string) => ({
            label: cons,
            value: cons,
        })));
    }

    return(
        <Container>          
            <Header/>    
            <Navbar/>   
            <Content>
                <Form ref={ formRef } onSubmit={handleSubmit}>
                    <Capas>
                    {
                        URLcapaJogoOfertadoSelecionado?
                        <img src={URLcapaJogoOfertadoSelecionado} alt="Jogo ofertado"/>
                        :
                        <img src={capaPlaceholder} alt="Jogo ofertado"/>
                    }
                    {
                        URLcapaJogoDesejadoSelecionado?
                        <img src={URLcapaJogoDesejadoSelecionado} alt="Jogo desejado"/>
                        :
                        <img src={capaPlaceholder} alt="Jogo desejado"/>
                    }
                    </Capas>

                    <Ofertado>
                        <label htmlFor='jogoOfertado'>Jogo ofertado</label>
                        <Select 
                            name="jogoOfertado" 
                            options={optionsJogos} 
                            onChange={(jogoSelecionado: any) => handleJogoOfertado(jogoSelecionado)}
                            isSearchable={true}
                        />
                        <label htmlFor='consolesDoJogoOfertado'>Consoles</label>
                        <Select 
                            name="consolesDoJogoOfertado"
                            options={optionsConsolesDoJogoOfertado} 
                            key={keyConsolesOfertados}
                        />
                    </Ofertado>

                    <Desejado>
                        <label htmlFor='jogoDesejado'>Jogo desejado</label> 
                        <Select 
                            name="jogoDesejado" 
                            options={optionsJogos} 
                            onChange={(jogoSelecionado: any) => handleJogoDesejado(jogoSelecionado)}
                            isSearchable={true}

                        />
                        <label htmlFor='consolesDoJogoDesejado'>Consoles</label>
                        <Select 
                            name="consolesDoJogoDesejado" 
                            options={optionsConsolesDoJogoDesejado} 
                            key={keyConsolesDesejados}
                        />
                    </Desejado>

                    <Input name='descricao' placeholder='Descricão da troca'/>

                    <Button type="submit">Criar troca</Button>
                </Form>
                
            </Content>
        </Container>

    )

};

export default TrocasDisponiveis;
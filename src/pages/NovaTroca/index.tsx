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

import { Container, Content} from './styles';

import api from '../../services/api';

import { FormHandles } from '@unform/core';
import getValidationErrors from '../../utils/getValidationErrors';
import { useHistory } from 'react-router-dom';

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

const TrocasDisponiveis: React.FC = () => {
    const { usuario } = useAuth();
    const { addToast } = useToast();

    const [jogos, setJogos] = useState<IJogo[]>([]);
    const [optionsJogos , setOptionsJogos] = useState<IOptions[]>([]);

    const [optionsConsolesDoJogoDesejado, setOptionsConsolesDoJogoDesejado] = useState<IOptions[]>([]);
    const [optionsConsolesDoJogoOfertado, setOptionsConsolesDoJogoOfertado] = useState<IOptions[]>([]);

    //const [consoleJogoOfertado, setConsoleJogoOfertado] = useState<IOptions[]>([]);


    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    useEffect(() => {
        async function loadJogos(): Promise<void> {
            api.get<IJogo[]>('/jogos')
            .then(response => {
                setJogos(response.data);
            })  
        }

        loadJogos();
    }, []);

    useEffect(() => {
        async function loadOptions(): Promise<void> {
            setOptionsJogos(jogos.map( jogo => {
                return({
                    label: jogo.nome,
                    value: jogo.id,
                })
            }));
        }

        loadOptions();
    }, [jogos]);

    const handleSubmit = useCallback(async () => {
        const idJogoOfertado = formRef.current?.getFieldValue('jogoOfertado');
        const idJogoDesejado = formRef.current?.getFieldValue('jogoDesejado');

        const consoleJogoOfertado = formRef.current?.getFieldValue('consolesDoJogoOfertado');
        const consoleJogoDesejado = formRef.current?.getFieldValue('consolesDoJogoDesejado');


        const descricao = formRef.current?.getFieldValue('descricao');

        //TODO Tornar a descrição opcional
        //TODO Resetar o campo de consoles quando o jogo é alterado
        //TODO Mostrar a foto do jogos selecionados

        const data = {
            descricao,
            idJogoOfertado,
            idJogoDesejado,
            consoleJogoOfertado,
            consoleJogoDesejado,
        }

        try{
            const schema = Yup.object().shape({
                idJogoOfertado: Yup.string().required('Obrigatório'),
                idJogoDesejado: Yup.string().required('Obrigatório'),
                consoleJogoOfertado: Yup.string().required('Obrigatório'),
                consoleJogoDesejado: Yup.string().required('Obrigatório'),
                descricao: Yup.string().required('Obrigatório'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            console.log(data);
            
            await api.post('/trocas', data);

            history.push('/minhas-trocas');

        } catch (err) {
            if(err instanceof Yup.ValidationError) {

                const errors = getValidationErrors(err);

                // ? -> Serve para verificar se a variável existe para então chamar a função setErrors (optional chaining)
                formRef.current?.setErrors({errors});

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro',
                description: 'Ocorreu um erro ao criar troca'
            });
        }
    },[addToast, history])

    async function handleJogoOfertado(val: any): Promise<void> {
        const id = val.value;

        let consoles: string[] = [];
        
        for (let i = 0; i < jogos.length; i++) {
            if(jogos[i].id === id){
                consoles = jogos[i].consoles;
            }
        }

        setOptionsConsolesDoJogoOfertado(consoles.map(cons => ({
            label: cons,
            value: cons,
        })));
    }

    async function handleJogoDesejado(val: any): Promise<void> {
        const id = val.value;

        let consoles: string[] = [];
        
        for (let i = 0; i < jogos.length; i++) {
            if(jogos[i].id === id){
                consoles = jogos[i].consoles;
            }
        }

        setOptionsConsolesDoJogoDesejado(consoles.map(cons => ({
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
                    <Select 
                        name="jogoOfertado" 
                        options={optionsJogos} 
                        onChange={(val: any) => handleJogoOfertado(val)}
                    />
                    <Select 
                        name="jogoDesejado" 
                        options={optionsJogos} 
                        onChange={(val: any) => handleJogoDesejado(val)}
                    />

                    <Select 
                        name="consolesDoJogoOfertado"
                        options={optionsConsolesDoJogoOfertado} 
                    />
                    <Select 
                        name="consolesDoJogoDesejado" 
                        options={optionsConsolesDoJogoDesejado} 
                    />

                    <Input name='descricao' placeholder='Descricão da troca'/>

                    <Button type="submit">Criar troca</Button>
                </Form>
                
            </Content>
        </Container>

    )

};

export default TrocasDisponiveis;
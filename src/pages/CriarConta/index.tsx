import React, {useCallback, useRef, useEffect, useState} from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock, FiPhone, FiItalic } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';
import Select from '../../components/Select';

import { Container, Content, AnimationContainer } from './styles';

interface CriarContaFormData {
    username: string;
    email: string;
    senha: string;
    nome: string;
    telefone: string;
    municipio: string;
    estado: string;
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

const CriarConta: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();
    const [optionsEstados, setOptionsEstados] = useState<IOptions[]>([]);
    const [optionsMunicipios, SetOptionsMunicipios] = useState<IOptions[]>([]);
    const [keyMunicipio, setKeyMunicipio] = useState<string | null>();
    const [carregando, setCarregando] = useState<boolean>(false);

    useEffect(()=>{
        api.get<IInfoIBGE[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome')
        .then(response => {            
            setOptionsEstados(response.data.map(item => ({
                label: item.nome,
                value: item.nome,
                id: item.id,
            })))
        })
    }, [])

    const handleSubmit = useCallback(
        async (data: CriarContaFormData) => {    
            setCarregando(true);

            try {
                formRef.current?.setErrors({});

                //schema -> Utilizado para fazer a validação em um objeto
                const schema = Yup.object().shape({
                    username: Yup.string().required('Nome de Usuário Obrigatório'),
                    email: Yup.string()
                    .required('Email Obrigatório')
                    .email('Digite um e-mail válido'),
                    senha: Yup.string().min(6, 'no mínimo 6 digitos'),
                    nome: Yup.string().required('Nome Obrigatório'),
                    telefone: Yup.string().required('Obrigatório'),
                    municipio: Yup.string().required('Obrigatório'),
                    estado: Yup.string().required('Obrigatório'),
                });

                await schema.validate(data, {
                    abortEarly: false,  
                });

                api.post('/usuarios', data)
                .then(() => {
                    addToast({
                        type: "success",
                        title: "Cadastro realizado",
                        description: "Você já pode fazer seu login!",
                    });

                    history.push('/login');
                })
                .catch(err => {
                    console.log(err);

                    addToast({
                        type: 'error',
                        title: 'Erro no cadastro',
                        description: 'Ocorreu um erro ao fazer cadastro'
                    });     
                })
                .finally(() => {
                    setCarregando(false);
                })

            } catch (err) {
                setCarregando(false);

                if(err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    // ? -> Serve para verificar se a variável existe para então chamar a função setErrors (optional chaining)
                    formRef.current?.setErrors({errors});

                    addToast({
                        type: 'error',
                        title: 'Erro no cadastro',
                        description: 'Preencher todos os campos'
                    });

                    return;
                }
            }
    }, [addToast, history]);

    
    async function handleEstadoChange(val: any): Promise<void> {
        const id = val.id;

        setKeyMunicipio(`key_municipio_${id}`);

        api.get<IInfoIBGE[]>(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${id}/municipios`)
        .then(response => {            
            SetOptionsMunicipios(response.data.map(item => ({
                id: item.id,
                label: item.nome,
                value: item.nome,
            })))
        })
    }

    return (
    <Container>
        <Content>
            <AnimationContainer>     
                <Form ref={ formRef } onSubmit={handleSubmit}>
                    <h1>Crie sua conta</h1>

                    <Input name="username" icon={FiUser} placeholder="Nome de usuário"/>

                    <Input name="email" icon={FiMail} placeholder="E-mail"/>

                    <Input name="senha" icon={FiLock} type="password" placeholder="Senha"/>

                    <Input name="nome" icon={FiItalic} placeholder="Nome"/>

                    <Input name="telefone" type='number' icon={FiPhone} placeholder="Telefone"/>

                    <Select 
                        placeholder="Estado"
                        name="estado"
                        options={optionsEstados} 
                        onChange={(val: any) => handleEstadoChange(val)}
                    />

                    <Select 
                        placeholder="Município"
                        name="municipio"
                        options={optionsMunicipios} 
                        key={keyMunicipio}
                    />

                    <Button loading={carregando} type="submit">Criar conta</Button>
                </Form>

                <Link to="/login">
                    <FiArrowLeft />
                    Voltar para login
                </Link>    
            </AnimationContainer>
        </Content>
    </Container>);
};

export default CriarConta;
import React, {useCallback, useRef} from 'react';
import { FiArrowLeft, FiMail, FiUser, FiLock, FiPhone, FiItalic, FiMap, FiMapPin } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';

import { useToast } from '../../hooks/toast';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface CriarContaFormData {
    username: string;
    email: string;
    senha: string;
    nome: string;
    telefone: string;
    bairro: string;
    cidade: string;
    uf: string;
}

const CriarConta: React.FC = () => {

    const formRef = useRef<FormHandles>(null);
    const { addToast } = useToast();
    const history = useHistory();

    //TODO na criação da conta trocar o campo uf por estado, mas no banco salvar com UF

    const handleSubmit = useCallback(
        async (data: CriarContaFormData) => {    
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
                    bairro: Yup.string().required('Obrigatório'),
                    cidade: Yup.string().required('Obrigatório'),
                    uf: Yup.string().required('Obrigatório'),
                });

                //throw new Error();

                //Não passa daqui
                //update: passou, não estava passando por causa do email, se botar qualquercoisa@gmail.com vai
                await schema.validate(data, {
                    abortEarly: false,  
                });

                await api.post('/usuarios', data);

                history.push('/login');

                addToast({
                    type: "success",
                    title: "Cadastro realizado",
                    description: "Você já pode fazer seu login!",
                });
                
            } catch (err) {
                if(err instanceof Yup.ValidationError) {
                    const errors = getValidationErrors(err);

                    // ? -> Serve para verificar se a variável existe para então chamar a função setErrors (optional chaining)
                    formRef.current?.setErrors({errors});

                    return;
                }

                addToast({
                    type: 'error',
                    title: 'Erro no cadastro',
                    description: 'Ocorreu um erro ao fazer cadastro'
                });
            }
    }, [addToast, history]);

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

                    <Input name="telefone" icon={FiPhone} placeholder="Telefone"/>

                    <Input name="cidade" icon={FiMap}  placeholder="Cidade"/>

                    <Input name="bairro" icon={FiMapPin} placeholder="Bairro"/>

                    <Input name="uf" placeholder="UF"/>

                    <Button type="submit">Criar conta</Button>
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
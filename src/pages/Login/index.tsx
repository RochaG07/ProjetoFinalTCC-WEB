import React, { useRef, useCallback } from 'react';
import { FiLogIn, FiLock, FiUser} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {socket} from '../../services/socket';

import { Container, Content, AnimationContainer } from './styles';

interface LoginFormData {
    username: string;
    senha: string;
}

const Login: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { login } = useAuth();
    const { addToast } = useToast();

    const history = useHistory();

    const handleSubmit = useCallback(async (data: LoginFormData) => {  
        try {

            formRef.current?.setErrors({});

            //schema -> Utilizado para fazer a validação em um objeto
            const schema = Yup.object().shape({
                username: Yup.string().required('Usuário Obrigatório'),
                senha: Yup.string().required('Senha obrigatória'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            login({
                username: data.username,
                senha: data.senha,
            })
            .then( usuario => {
                socket.emit('login', usuario.id);
            })


            history.push('/trocas-disponiveis');

        } catch (err) {

            // Verifica se o erro foi na validação
            if(err instanceof Yup.ValidationError) {

                const errors = getValidationErrors(err);

                // ? -> Serve para verificar se a variável existe para então chamar a função setErrors (optional chaining)
                formRef.current?.setErrors({errors});

                return;
            }

            addToast({
                type: 'error',
                title: 'Erro na autenticação',
                description: 'Ocorreu um erro ao fazer login'
            });
        }
    }, [login, addToast, history]);

    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={ formRef } onSubmit={ handleSubmit }>
                        <h1>Faça seu Login</h1>

                        <Input name="username" icon={FiUser} placeholder="Usuário"/>

                        <Input name="senha" icon={FiLock} type="password" placeholder="Senha"/>

                        <Button type="submit">Entrar</Button>

                        <Link to="/esqueci-minha-senha">Esqueci minha senha</Link>
                    </Form>

                    <Link to="/criar-conta">
                        <FiLogIn />
                        Criar conta
                    </Link>
                </AnimationContainer>
            </Content>
        </Container>
    )

};

export default Login;
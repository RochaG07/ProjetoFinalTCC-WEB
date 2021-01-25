import React, { useRef, useCallback } from 'react';
import { FiLock } from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';

import api from '../../services/api';

import { useHistory, useLocation } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface ResetSenhaFormData {
    senha: string;
    senha_confirmacao: string;
}

const ResetSenha: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const history = useHistory();
    const location = useLocation();

    const handleSubmit = useCallback(async (data: ResetSenhaFormData) => {    
        try {
            formRef.current?.setErrors({});

            //schema -> Utilizado para fazer a validação em um objeto
            const schema = Yup.object().shape({
                senha: Yup.string().required('Senha obrigatória'),
                senha_confirmacao: Yup.string().oneOf(
                    [Yup.ref('senha'), undefined],
                    'Confirmação incorreta',
                ),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const { senha, senha_confirmacao} = data;
            const token = location.search.replace('?token=', '');

            if(!token) {
                throw new Error();
            }

            await api.post('/senhas/resetar_senha', {
                senha,
                senha_confirmacao,
                token
            });

            history.push('/')
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
                title: 'Erro ao resetar senha',
                description: 'Ocorreu um erro ao resetar senha'
            });
        } 
    }, [addToast, history, location.search]);

    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={ formRef } onSubmit={ handleSubmit }>
                        <h1>Resetar senha</h1>

                        <Input name="senha" icon={FiLock} type="password" placeholder="Nova senha"/>

                        <Input 
                            name="senha_confirmacao" 
                            icon={FiLock} 
                            type="password" 
                            placeholder="Confirmação da senha"
                        />

                        <Button type="submit">Alterar senha</Button>

                    </Form>
                </AnimationContainer>
            </Content>

        </Container>
    )

};

export default ResetSenha;
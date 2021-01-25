import React, { useRef, useCallback } from 'react';
import { FiArrowLeft, FiMail} from 'react-icons/fi';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import { useToast } from '../../hooks/toast';

import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';

//import logoImg from '../../assets/logo.svg';

import api from '../../services/api';
import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container, Content, AnimationContainer } from './styles';

interface EsqueciMinhaSenhaFormData {
    email: string;
}
const EsqueciSenha: React.FC = () => {
    const formRef = useRef<FormHandles>(null);

    const { addToast } = useToast();

    const history = useHistory();

    const handleSubmit = useCallback(async (data: EsqueciMinhaSenhaFormData) => {    
        try {
            formRef.current?.setErrors({});

            //schema -> Utilizado para fazer a validação em um objeto
            const schema = Yup.object().shape({
                email: Yup.string().required('Email Obrigatório').email(),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            await api.post('/senhas/esqueci', data);

            addToast({
                type: "success",
                title: 'Email enviado',
                description: 'O email de recuperação foi enviado com sucesso'
            });

            history.push('/login');
            
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
                title: 'Erro na envio',
                description: 'Ocorreu um erro ao enviar email'
            });
        }
    }, [ addToast, history]);

    return(
        <Container>
            <Content>
                <AnimationContainer>
                    <Form ref={ formRef } onSubmit={ handleSubmit }>
                        <h1>Digite seu e-mail de recuperação</h1>
                        <Input name="email" icon={FiMail}  placeholder="E-mail"/>

                        <Button type="submit">Enviar</Button>
                    </Form>

                    <Link to="/login">
                        <FiArrowLeft />
                        Voltar para login
                    </Link>  
                </AnimationContainer>
            </Content>
        </Container>
    )

};

export default EsqueciSenha;
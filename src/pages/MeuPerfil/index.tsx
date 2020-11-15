import React, { useRef, useCallback, ChangeEvent } from 'react';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';
import { FiMail, FiUser, FiLock, FiCamera, FiPhone, FiItalic, FiMap, FiMapPin } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import { useHistory } from 'react-router-dom';

import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErrors';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';
import Input from '../../components/Input';

import api from '../../services/api';

import { Container, Content, AvatarInput } from './styles';

import Button from '../../components/Button';

interface PerfilFormData {
    username: string;
    email: string;
    nome: string;
    telefone: string;
    bairro: string;
    cidade: string;
    uf: string;
    senha_antiga: string;
    senha: string;
    senha_confirmacao: string;
}

const MeuPerfil: React.FC = () => {
    const { usuario, atualizaUsuario } = useAuth();
    const { addToast } = useToast();

    const history = useHistory();
    
    const formRef = useRef<FormHandles>(null);

    const handleSubmit = useCallback(async (data: PerfilFormData) => {    
        try {
            formRef.current?.setErrors({});

            const schema = Yup.object().shape({
                username: Yup.string().required('Nome de Usuário Obrigatório'),
                email: Yup.string()
                .required('Email Obrigatório')
                .email('Digite um e-mail válido'),
                nome: Yup.string().required('Nome Obrigatório'),
                telefone: Yup.string().required('Obrigatório'),
                bairro: Yup.string().required('Obrigatório'),
                cidade: Yup.string().required('Obrigatório'),
                uf: Yup.string().required('Obrigatório'),
                senha_antiga: Yup.string(),
                senha: Yup.string().when('senha_antiga', {
                    is: val => !!val.length,
                    then: Yup.string().required('Campo Obrigatório'),
                    otherwise: Yup.string(),
                }),
                senha_confirmacao: Yup.string()
                .when('senha_antiga', {
                    is: val => !!val.length,
                    then: Yup.string().required('Campo Obrigatório'),
                    otherwise: Yup.string(),
                })
                .oneOf([Yup.ref('senha')], 'Confirmação incorreta'),
            });

            await schema.validate(data, {
                abortEarly: false,
            });

            const {
                username, 
                email, 
                nome,
                telefone, 
                bairro, 
                cidade, 
                uf,
                senha_antiga, 
                senha, 
                senha_confirmacao, 
            } = data;


            const formData = {
                username, 
                email,
                nome,
                telefone,
                bairro,
                cidade,
                uf,
                ...(senha_antiga
                    ? {
                        senha_antiga,
                        senha,
                        senha_confirmacao
                    }
                    : {}),
            };

            const response = await api.put('/perfil', formData);

            atualizaUsuario(response.data);

            history.push('/trocas-disponiveis');

            addToast({
                type: "success",
                title: "Perfil atualizado",
                description: "Suas informações de perfil foram atualizadas com sucesso!",
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
                title: 'Erro na atualização',
                description: 'Ocorreu um erro ao fazer atualização'
            });
        }
    }, [addToast, history, atualizaUsuario]);

    const handleAvatarChange = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            if( e.target.files){
                const data = new FormData();

                data.append('avatar', e.target.files[0]);

                api.patch('usuarios/avatar/', data).then(response => {
                    atualizaUsuario(response.data);

                    addToast({
                        type:'success',
                        title: 'Avatar atualizado!',
                    });
                });
            }
    }, [addToast, atualizaUsuario]);

    return(
        <Container>
            <Header />
            <Navbar />
            <Content>
                <Form ref={ formRef } initialData={{
                    username: usuario.username,
                    nome: usuario.nome,
                    email: usuario.email,
                    telefone: usuario.telefone,
                    bairro: usuario.bairro,
                    cidade: usuario.cidade,
                    uf: usuario.uf,
                }} onSubmit={handleSubmit}
                >
                    <AvatarInput>                    
                        <img src={usuario.avatar_url} alt={usuario.nome} />
                        <label htmlFor='avatar'>
                            <FiCamera />
                            <input type="file" id="avatar" onChange={handleAvatarChange} />
                        </label>
                    </AvatarInput>

                    <Input name="username" icon={FiUser} placeholder="Nome de usuário"/>

                    <Input name="email" icon={FiMail} placeholder="E-mail"/>

                    <Input name="nome" icon={FiItalic} placeholder="Nome"/>

                    <Input name="telefone" icon={FiPhone} placeholder="Telefone"/>

                    <Input name="cidade" icon={FiMap}  placeholder="Cidade"/>

                    <Input name="bairro" icon={FiMapPin} placeholder="Bairro"/>

                    <Input name="uf" placeholder="UF"/>

                    <Input containerStyle={{marginTop: 24}} name="senha_antiga" icon={FiLock} type="password" placeholder="Senha atual"/>

                    <Input name="senha" icon={FiLock} type="password" placeholder="Senha"/>
                    <Input name="senha_confirmacao" icon={FiLock} type="password" placeholder="Confirmar senha"/>

                    <Button type="submit">Confirmar mudanças</Button>
                </Form>
            </Content>
        </Container>
    )

};

export default MeuPerfil;
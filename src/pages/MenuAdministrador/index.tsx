import React, { useState, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';

import { useHistory } from 'react-router-dom'; 

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import ModalCadastrarJogo from '../../components/ModalCadastrarJogo';
import ModalCadastrarConsole from '../../components/ModalCadastrarConsole';
import ModalEnviarAviso from '../../components/ModalEnviarAviso';
import ModalAddPermissao from '../../components/ModalAddPermissao';
import ModalAtribuirStatusDeAdm from '../../components/ModalAtribuirStatusDeAdm';


import { Container, Content } from './styles';

import Button from '../../components/Button';
import api from '../../services/api';

const MenuAdministrador: React.FC = () => {
    const { usuario } = useAuth();

    const [modalCadastrarJogoOpen, setModalCadastrarJogoOpen] = useState(false);
    const [modalCadastrarConsoleOpen, setModalCadastrarConsoleOpen] = useState(false);
    const [modalEnviarAvisoOpen, setModalEnviarAvisoOpen] = useState(false);
    const [modalAddPermissaoOpen, setModalAddPermissaoOpen] = useState(false);
    const [modalAtribuirStatusDeAdmOpen, setModalAtribuirStatusDeAdmOpen] = useState(false);

    const [mostrarCadastrarJogo, setMostrarCadastrarJogo] = useState(false);
    const [mostrarCadastrarConsole, setMostrarCadastrarConsole] = useState(false);
    const [mostrarEnviarAviso, setMostrarEnviarAviso] = useState(false);
    const [mostrarAddPermissao, setMostrarAddPermissao] = useState(false);
    const [mostrarAtribuirStatusDeAdm, setMostrarAtribuirStatusDeAdm] = useState(false);


    const history = useHistory();

    useEffect(()=> {
      if(!usuario.possuiStatusDeAdm){
        history.push('/login');
      }
        //TODO Incorporar isso na rota de autenticação
        api.get('/admin')
      .then(response => {
        response.data.permissoes.forEach((permissao: string) => {
            switch(permissao){
              case 'cadastrar_jogos':
                setMostrarCadastrarJogo(true);
                break;
              case 'cadastrar_consoles':
                setMostrarCadastrarConsole(true);
                break;
              case 'enviar_avisos':
                setMostrarEnviarAviso(true);
                break;
              case 'add_permissoes':
                setMostrarAddPermissao(true);
                break;
              case 'atribuir_status_de_admin':
                setMostrarAtribuirStatusDeAdm(true);
                break;
            }
        })
      })
    }, [usuario, history])

    async function handleCadastrarJogo(): Promise<void> {
      toggleModalCadastrarJogo();
    }
    async function handleCadastrarConsole(): Promise<void> {
      toggleModalCadastrarConsole();
    }
    async function handleEnviarAviso(): Promise<void> {
      toggleModalEnviarAviso();
    }
    async function handleAddPermissao(): Promise<void> {
      toggleModalAddPermissao();
    }
    async function handleAtribuirStatusDeAdm(): Promise<void> {
      toggleModalAtribuirStatusDeAdm();
    }

    function toggleModalCadastrarJogo(): void {
      setModalCadastrarJogoOpen(!modalCadastrarJogoOpen);
    }
    function toggleModalCadastrarConsole(): void {
      setModalCadastrarConsoleOpen(!modalCadastrarConsoleOpen);
    }
    function toggleModalEnviarAviso(): void {
      setModalEnviarAvisoOpen(!modalEnviarAvisoOpen);
    }
    function toggleModalAddPermissao(): void {
      setModalAddPermissaoOpen(!modalAddPermissaoOpen);
    }
    function toggleModalAtribuirStatusDeAdm(): void {
      setModalAtribuirStatusDeAdmOpen(!modalAtribuirStatusDeAdmOpen);
    }

    return(
      <Container>
        <Header />
        <Navbar />
        <Content>
          {
            mostrarCadastrarJogo&&
            <>
              <ModalCadastrarJogo
              isOpen={modalCadastrarJogoOpen}
              setIsOpen={toggleModalCadastrarJogo}
              />
              
              <Button onClick={handleCadastrarJogo}>Cadastrar jogo</Button>
            </>
          }

          {
            mostrarCadastrarConsole&&
            <>
              <ModalCadastrarConsole
              isOpen={modalCadastrarConsoleOpen}
              setIsOpen={toggleModalCadastrarConsole}
              />
              <Button onClick={handleCadastrarConsole}>Cadastrar console</Button>
            </>
          }
          {
            mostrarEnviarAviso&&
            <>
              <ModalEnviarAviso
              isOpen={modalEnviarAvisoOpen}
              setIsOpen={toggleModalEnviarAviso}
              />

              <Button onClick={handleEnviarAviso}>Enviar aviso</Button>
            </>
          }
          {
            mostrarAddPermissao&&
            <>
              <ModalAddPermissao
              isOpen={modalAddPermissaoOpen}
              setIsOpen={toggleModalAddPermissao}
              />

              <Button onClick={handleAddPermissao}>Adicionar permissão a admin</Button>
            </>
          }
          {
            mostrarAtribuirStatusDeAdm&&
            <>
              <ModalAtribuirStatusDeAdm
              isOpen={modalAtribuirStatusDeAdmOpen}
              setIsOpen={toggleModalAtribuirStatusDeAdm}
              />

              <Button onClick={handleAtribuirStatusDeAdm}>Atribuir usuário status de admin</Button>
            </>
          }
        </Content>
      </Container>
    )
};

export default MenuAdministrador;
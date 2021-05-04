import React, { useState, useEffect } from 'react';

import { useAuth } from '../../hooks/auth';

import { useHistory } from 'react-router-dom'; 

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import ModalCadastrarJogo from '../../components/ModalCadastrarJogo';
import ModalDeletarJogo from '../../components/ModalDeletarJogo';
import ModalCadastrarConsole from '../../components/ModalCadastrarConsole';
import ModalDeletarConsole from '../../components/ModalDeletarConsole';

import ModalEnviarAviso from '../../components/ModalEnviarAviso';
import ModalAddPermissao from '../../components/ModalAddPermissao';
import ModalAtribuirStatusDeAdm from '../../components/ModalAtribuirStatusDeAdm';
import ModalRemoverStatusDeAdm from '../../components/ModalRemoverStatusDeAdm';


import { Container, Content } from './styles';

import Button from '../../components/Button';
import api from '../../services/api';

const MenuAdministrador: React.FC = () => {
    const { usuario } = useAuth();

    const [modalCadastrarJogoOpen, setModalCadastrarJogoOpen] = useState(false);
    const [modalDeletarJogoOpen, setModalDeletarJogoOpen] = useState(false);
    const [modalCadastrarConsoleOpen, setModalCadastrarConsoleOpen] = useState(false);
    const [modalDeletarConsoleOpen, setModalDeletarConsoleOpen] = useState(false);

    const [modalEnviarAvisoOpen, setModalEnviarAvisoOpen] = useState(false);
    const [modalAddPermissaoOpen, setModalAddPermissaoOpen] = useState(false);

    const [modalAtribuirStatusDeAdmOpen, setModalAtribuirStatusDeAdmOpen] = useState(false);
    const [modalRemoverStatusDeAdmOpen, setModalRemoverStatusDeAdmOpen] = useState(false);

    const [mostrarCadastrarJogo, setMostrarCadastrarJogo] = useState(false);
    const [mostrarDeletarJogo, setMostrarDeletarJogo] = useState(false);
    const [mostrarCadastrarConsole, setMostrarCadastrarConsole] = useState(false);
    const [mostrarDeletarConsole, setMostrarDeletarConsole] = useState(false);

    const [mostrarEnviarAviso, setMostrarEnviarAviso] = useState(false);
    const [mostrarAddPermissao, setMostrarAddPermissao] = useState(false);

    const [mostrarAtribuirStatusDeAdm, setMostrarAtribuirStatusDeAdm] = useState(false);
    const [mostrarRemoverStatusDeAdm, setMostrarRemoverStatusDeAdm] = useState(false);


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
              case 'deletar_jogos':
                setMostrarDeletarJogo(true);
                break;
              case 'cadastrar_consoles':
                setMostrarCadastrarConsole(true);
                break;
              case 'deletar_consoles':
                setMostrarDeletarConsole(true);
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
              case 'desativar_status_de_admin':
                setMostrarRemoverStatusDeAdm(true);
                break;
            }
        })
      })
    }, [usuario, history])

    async function handleCadastrarJogo(): Promise<void> {
      toggleModalCadastrarJogo();
    }
    async function handleDeletarJogo(): Promise<void> {
      toggleModalDeletarJogo();
    }
    async function handleCadastrarConsole(): Promise<void> {
      toggleModalCadastrarConsole();
    }
    async function handleDeletarConsole(): Promise<void> {
      toggleModalDeletarConsole();
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
    async function handleRemoverStatusDeAdm(): Promise<void> {
      toggleModalRemoverStatusDeAdm();
    }

    function toggleModalCadastrarJogo(): void {
      setModalCadastrarJogoOpen(!modalCadastrarJogoOpen);
    }
    function toggleModalDeletarJogo(): void {
      setModalDeletarJogoOpen(!modalDeletarJogoOpen);
    }
    function toggleModalCadastrarConsole(): void {
      setModalCadastrarConsoleOpen(!modalCadastrarConsoleOpen);
    }
    function toggleModalDeletarConsole(): void {
      setModalDeletarConsoleOpen(!modalDeletarConsoleOpen);
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
    function toggleModalRemoverStatusDeAdm(): void {
      setModalRemoverStatusDeAdmOpen(!modalRemoverStatusDeAdmOpen);
    }

    return(
      <Container>
        <Header />
        <Navbar selectedPage={'admin'}/>
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
            mostrarDeletarJogo&&
            <>
              <ModalDeletarJogo
              isOpen={modalDeletarJogoOpen}
              setIsOpen={toggleModalDeletarJogo}
              />
              
              <Button onClick={handleDeletarJogo}>Deletar jogo</Button>
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
            mostrarDeletarConsole&&
            <>
              <ModalDeletarConsole
              isOpen={modalDeletarConsoleOpen}
              setIsOpen={toggleModalDeletarConsole}
              />
              
              <Button onClick={handleDeletarConsole}>Deletar console</Button>
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
          {
            mostrarRemoverStatusDeAdm&&
            <>
              <ModalRemoverStatusDeAdm
              isOpen={modalRemoverStatusDeAdmOpen}
              setIsOpen={toggleModalRemoverStatusDeAdm}
              />

              <Button onClick={handleRemoverStatusDeAdm}>Remover status de admin de um usuário</Button>
            </>
          }
        </Content>
      </Container>
    )
};

export default MenuAdministrador;
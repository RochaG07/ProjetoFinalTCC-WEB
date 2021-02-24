import React, { useRef, useCallback, useEffect, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form} from './styles';
import Modal from '../Modal';
import Input from '../Input';

import {chatSocket} from '../../services/socket';

import { FiSend } from 'react-icons/fi';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import { createNonNullExpression } from 'typescript';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  idNeg: string;
}

interface IFormData{
  mensagem: string;
}

interface MensagemChat {
  id: string,
  nomeusuario: string,
  conteudo: string,
  dataEnvio: Date,
  idNeg: string,
}

interface IUserInChat {
  socketId: string,
  nome: string,
  idNeg: string,
}

const ModalMostrarChat: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  idNeg
}) => {
  const formRef = useRef<FormHandles>(null);
  const {usuario} = useAuth();

  const [mensagens, setMensagens] = useState<MensagemChat[]>([]);
  //const [UsuariosNaSala, setUsuariosNaSala] = useState<IUserInChat[]>([]);

  useEffect(() => {
    async function loadMensagens(): Promise<void>{
      api.get<MensagemChat[]>(`trocas/mensagemChat/${idNeg}`)
      .then(response => {
        setMensagens(response.data);
      })
    }

    loadMensagens();
  }, [idNeg]);

  
  useEffect(() => {
    if(isOpen){
      chatSocket.emit('abrir chat', {
        nomeusuario: usuario.nome,
        idNeg
      });

    } else {
      chatSocket.emit('fechar chat', {
        nomeusuario: usuario.nome,
        idNeg
      });

      chatSocket.offAny();
    }
  }, [ idNeg, isOpen, usuario])


  /*
  //Entrada de usuário na sala
  useEffect(() => {
    chatSocket.off('usuario entrou');

    chatSocket.on('usuario entrou', (usuarioQueEntrou: IUserInChat) => {
      console.log('usuario entrou');

      setUsuariosNaSala([...UsuariosNaSala, usuarioQueEntrou]);
    }) 
  }, [UsuariosNaSala]);

  //Saida de usuário na sala
  useEffect(() => {
    chatSocket.off('usuario saiu');

    chatSocket.on('usuario saiu', (usuarioQueSaiu: IUserInChat) => {
      //console.log('usuario saiu');

      //remover usuário da lista quando ele sair do chat

      console.log(usuarioQueSaiu);

      console.log(UsuariosNaSala.filter(usuarioNaSala => (
        usuarioNaSala.socketId !== usuarioQueSaiu.socketId
      )));

      setUsuariosNaSala(UsuariosNaSala.filter(usuarioNaSala => (
        usuarioNaSala.socketId !== usuarioQueSaiu.socketId 
      )));
    }) 
  }, [UsuariosNaSala]);
  */
  
  useEffect(() => {
    //Evita que seja criada vários listeners de 'mensagem recebida'
    chatSocket.off('mensagem recebida');

    chatSocket.on('mensagem recebida', (mensagem: MensagemChat) => {
      setMensagens([...mensagens, mensagem]);
    });

  }, [mensagens]);

  const handleSubmit = useCallback(
    async (data: IFormData) => {     

      api.post<MensagemChat>(`trocas/mensagemChat`, {
        conteudo: data.mensagem,
        nomeusuario: usuario.nome,
        idNeg,
      })
      .then(response => {
        chatSocket.emit('enviar mensagem', response.data);

        setMensagens([...mensagens, response.data]);
      })
    },
    [ usuario, idNeg, mensagens ]
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
      <h1>{idNeg}</h1>

      {
        mensagens&&
        mensagens.map(mensagem => (
          <h3 key={mensagem.id}>{mensagem.nomeusuario+': '+mensagem.conteudo}</h3>
        ))
      }

      <Input name="mensagem" />

      <button type="submit">
          <div className="text">Enviar</div>
          <div className="icon">
            <FiSend size={24} />
          </div>
        </button>

      </Form>
    </Modal>
  );
};

export default ModalMostrarChat;

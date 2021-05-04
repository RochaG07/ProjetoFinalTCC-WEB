import React, { useRef, useCallback, useEffect, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form} from './styles';
import Modal from '../Modal';
import Input from '../Input';

import {socket} from '../../services/socket';

import { FiChevronRight } from 'react-icons/fi';
import {useAuth} from '../../hooks/auth';
import api from '../../services/api';
import { INegociacao } from '../../pages/Negociacoes';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  negociacao: INegociacao;
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

interface INomes {
  socketId: string,
  nome: string,
}

const ModalMostrarChat: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  negociacao
}) => {
  const formRef = useRef<FormHandles>(null);
  const {usuario} = useAuth();

  const [mensagens, setMensagens] = useState<MensagemChat[]>([]);

  const [nomeDeUsuariosNaSala, setNomeDeUsuariosNaSala] = useState<INomes[]>([]);

  useEffect(() => {
    async function loadMensagens(): Promise<void>{
      api.get<MensagemChat[]>(`trocas/mensagemChat/${negociacao.id}`)
      .then(response => {
        setMensagens(response.data);
      })
    }

    loadMensagens();
  }, [negociacao.id]);

  
  useEffect(() => {
    if(isOpen){
      socket.emit('abrir chat', {
        nome: usuario.nome,
        idNeg: negociacao.id
      });

    } else {
      socket.emit('fechar chat', {
        nome: usuario.nome,
        idNeg: negociacao.id
      });

      socket.offAny();
    }
  }, [ negociacao.id, isOpen, usuario])

  useEffect(() => {
    //Evita que seja criada vários listeners de 'mensagem recebida'
    socket.off('mensagem recebida');

    socket.on('mensagem recebida', (mensagem: MensagemChat) => {
      setMensagens([...mensagens, mensagem]);
      irParaUltimaMensagem();
    });

  }, [mensagens]);

  
  useEffect(() => {
    socket.off('usuarios na sala');

    socket.on('usuarios na sala', (nomes: INomes[]) => {
      setNomeDeUsuariosNaSala(nomes);
    });

  }, []);

  useEffect(() => {
    socket.off('add nome do usuario na sala');
    socket.off('remove nome do usuario na sala');

    socket.on('add nome do usuario na sala', (nome: INomes) => {
      setNomeDeUsuariosNaSala([...nomeDeUsuariosNaSala, nome]);
    });

    socket.on('remove nome do usuario na sala', (nome: INomes) => {
      setNomeDeUsuariosNaSala(nomeDeUsuariosNaSala.filter(nomes => (
        nomes.socketId !== nome.socketId
      )));
    });

  }, [nomeDeUsuariosNaSala]);

  const handleSubmit = useCallback(
    async (data: IFormData) => {     
      
      if(data.mensagem === '') return;

      api.post<MensagemChat>(`trocas/mensagemChat`, {
        conteudo: data.mensagem,
        nomeusuario: usuario.nome,
        idNeg: negociacao.id,
      })
      .then(response => {
        socket.emit('enviar mensagem', response.data);

        setMensagens([...mensagens, response.data]);
        irParaUltimaMensagem();
      })

      formRef.current?.setFieldValue('mensagem', '');
    },
    [ usuario, negociacao.id, mensagens ]
  );

  function irParaUltimaMensagem(): void{
    const div = document.getElementById('chat');

    if(div){
      div.scrollTop = div.scrollHeight - div.clientHeight;
    }
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
      <h1>Negociação entre {negociacao.nomeUsuarioCriador} e {negociacao.nomeUsuarioSolicitador}</h1>
      <h2>Troca do jogo {negociacao.troca.nomeJogoDesejado} pelo {negociacao.troca.nomeJogoOfertado}</h2>
      {
        nomeDeUsuariosNaSala&&
        nomeDeUsuariosNaSala.map(nomeNaSala => (
          <p className="usuariosEmSala" key={nomeNaSala.socketId}>{nomeNaSala.nome} </p>
        ))
      }
      <div id='chat'>
      {     
        mensagens&&
        mensagens.map(mensagem => (
          <p key={mensagem.id}>{mensagem.nomeusuario+': '+mensagem.conteudo}</p>
        ))     
      }
      </div>

      <div id="enviarMensagem">
        <Input name="mensagem" containerStyle={{
          border: 'none',
          borderTopRightRadius: "0px",
          borderBottomRightRadius: "0px"
        }}/>
        <button type="submit">
          <div id="text">Enviar</div>
          <div id="icon">
            <FiChevronRight size={24} />
          </div>
        </button>
      </div>

      </Form>
    </Modal>
  );
};

export default ModalMostrarChat;

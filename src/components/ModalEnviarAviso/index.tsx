import React, { useRef, useCallback } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../../components/Button';
import api from '../../services/api';

import { useToast } from '../../hooks/toast';
import { socket } from '../../services/socket';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface IEnviarAviso{
  username: string,
  titulo: string,
  conteudo: string,
}

const ModalEnviarAviso: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback( async ({username, titulo, conteudo}: IEnviarAviso) => {
    try{
      await api.post('admin/avisos', {username, titulo, conteudo});

      api.post('admin/avisos', {username, titulo, conteudo})
      .then(response => {
          socket.emit('apresentar novo aviso', {
              id: response.data.id,
              titulo: response.data.titulo,
              conteudo: response.data.conteudo,
              idUserAlvo: response.data.idUser,
          });
      })
      .catch((err) => {
          console.log(err);
      });

      addToast({
        type: "success",
        title: "Aviso enviado",
        description: "Aviso enviado com sucesso",
      });

    } catch(err){
      addToast({
        type: 'error',
        title: 'Erro no envio',
        description: 'Ocorreu um erro no envio do aviso '
      });
    }

    setIsOpen();
  }, [addToast, setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name='username' placeholder='Usuário destinatário'></Input>
        <Input name='titulo' placeholder='Título'></Input>
        <Input name='conteudo' placeholder='Conteudo'></Input>
        <Button type="submit">Enviar aviso</Button>
      </Form>
    </Modal>
  );
};

export default ModalEnviarAviso;

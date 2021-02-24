import React, { useRef, useCallback, useState } from 'react';

import { FiSend, FiArrowRightCircle } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

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

  const handleSubmit = useCallback( async (data: IEnviarAviso) => {
    try{

      //TODO se usuário que irá recever o aviso
      // estiver na lista de usuários logados no websocket, 
      // enviar o novo aviso pelo websocket(emit)

      await api.post('admin/avisos', data);

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

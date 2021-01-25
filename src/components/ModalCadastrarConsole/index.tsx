import React, { useRef, useCallback, useState, useEffect, ChangeEvent } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import Select from '../Select';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface ICriarJogoFormData {
  nome: string,
}

const ModalCadastrarConsole: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback( async (dataForm: ICriarJogoFormData) => {
    try{
      //TODO: cadastrar um novo console não atualiza a lista de consoles disponíveis no cadastro de jogos
      
      await api.post('/jogos/consoles', dataForm);

      addToast({
        type: "success",
        title: "Cadastro realizado",
        description: "Jogo cadastrado com sucesso",
      });
    } catch(err) {

      addToast({
        type: 'error',
        title: 'Erro no cadastro',
        description: 'Ocorreu um erro ao fazer cadastro do jogo'
      });
    }

    setIsOpen();
  }, [addToast, setIsOpen]);
  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name='nome' placeholder='Nome do Console'></Input>

        <Button type="submit">Cadastrar console</Button>
      </Form>
    </Modal>
  );
};

export default ModalCadastrarConsole;

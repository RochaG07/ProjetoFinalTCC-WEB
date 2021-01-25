import React, { useRef, useCallback } from 'react';

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

interface IAtribuirStatusDeAdminFormData {
  username: string,
}

const ModalAtribuirStatusDeAdm: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const handleSubmit = useCallback( async (data: IAtribuirStatusDeAdminFormData) => {
    try{      
      await api.post('/admin', data);

      addToast({
        type: "success",
        title: "Status de admin realizado",
        description: "Status de admin atribuido com sucesso",
      });
    } catch(err) {

      addToast({
        type: 'error',
        title: 'Erro ao atribuir status de admin',
        description: 'Ocorreu um erro ao atribuir status de admin'
      });
    }

    setIsOpen();
  }, [addToast, setIsOpen]);
  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <Input name='username' placeholder='Nome de usuário'></Input>

        <Button type="submit">Atribuir status de Admin</Button>
      </Form>
    </Modal>
  );
};

export default ModalAtribuirStatusDeAdm;

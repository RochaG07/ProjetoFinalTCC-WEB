import React, { useRef, useCallback } from 'react';

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

interface IAddPermissaoFormData {
  nomeAdmRecebedorDaPermissao: string,
  permissoes: string[],
}

const ModalAddPermissao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  
  const handleSubmit = useCallback( async (data: IAddPermissaoFormData) => {
    try{      
      await api.post('/admin/permissoes', data);

      addToast({
        type: "success",
        title: "Permissões adicionadas",
        description: "Permissões adicionadas com sucesso",
      });
    } catch(err) {

      addToast({
        type: 'error',
        title: 'Erro ao adicionar permissões',
        description: 'Ocorreu um erro ao adicionar permissões'
      });
    }

    setIsOpen();
  }, [addToast, setIsOpen]);
  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>

        <Input name='nomeAdmRecebedorDaPermissao' placeholder='Nome do admin'></Input>

        <Select
          isMulti
          name="permissoes"
          options={[
            {label: 'Cadastrar jogos',value:'cadastrar_jogos'},
            {label: 'Remover jogos',value:'remover_jogos'},
            {label: 'Cadastrar consoles',value:'remover_consoles'},
            {label: 'Remover consoles',value:'cadastrar_consoles'},
            {label: 'Enviar avisos',value:'enviar_avisos'},
            {label: 'Adicionar permissoes',value:'add_permissoes'},
            {label: 'Atribuir status de admin',value:'atribuir_status_de_admin'},
            {label: 'Remover status de admin',value:'desativar_status_de_admin'},
          ]}
        />

        <Button type="submit">Adicionar permissões</Button>
      </Form>
    </Modal>
  );
};

export default ModalAddPermissao;

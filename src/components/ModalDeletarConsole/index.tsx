import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Select from '../Select';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface IConsole{
  id: string,
  nome: string,
};


interface IOptionsConsoles{
  label: string,
  value: string,
}

const ModalDeletarConsole: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [optionsConsoles , setOptionsConsoles] = useState<IOptionsConsoles[]>([]);

  useEffect(() => {
    async function loadConsoles(): Promise<void> {
        api.get<IConsole[]>('/jogos/consoles')
        .then(response => {
            response.data.sort((item1, item2) => {
              if(item1.nome < item2.nome) return -1;
              else if(item1.nome > item2.nome) return 1;
              return 0;
            })

            setOptionsConsoles(response.data.map( jogo => ({
              label: jogo.nome,
              value: jogo.id,
            })));
        })  
    }

    loadConsoles();
}, []);

  const handleSubmit = useCallback( async ({id}:any) => {
    api.delete(`/jogos/consoles/${id}`)
    .then(response =>{
      addToast({
        type: 'success',
        title: 'Console deletado',
        description: 'Console deletado com sucesso'
    });
    })
    .catch(err => {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Ocorreu um erro ao deletar console'
    });
    })

    setIsOpen();

  }, [addToast, setIsOpen]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>

        <Select
          name="id"
          options={optionsConsoles}
        />

        <Button type="submit">Deletar console</Button>
      </Form>
    </Modal>
  );
};

export default ModalDeletarConsole;

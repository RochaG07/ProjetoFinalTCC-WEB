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
  consoles: string[],
}

interface IConsole{
  nome: string,
}

interface IOptions{
  label: string,
  value: string,
}

const ModalCadastrarJogo: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [consolesOptions, setConsolesOptions] = useState<IOptions[]>([]);
  const [capa, setCapa] = useState<File | null>(null);

  useEffect(() => {
    async function loadConsoles(): Promise<void> {
      api.get<IConsole[]>('/jogos/consoles')
      .then(response => {
        setConsolesOptions(response.data.map(cons => ({
          label: cons.nome,
          value: cons.nome,
        })));
      })  
    }

    loadConsoles();
  }, []);

  const handleSubmit = useCallback( async (dataForm: ICriarJogoFormData) => {
    try{
      if(capa === null){
        throw new Error();
      }

      const data = new FormData();

      data.append('capa', capa);
      data.append('nome', dataForm.nome);
      for (var i = 0; i < dataForm.consoles.length; i++) {
        data.append('consoles[]', dataForm.consoles[i]);
      }

      await api.post('/jogos', data);

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
  }, [addToast, capa, setIsOpen]);
  

  const handleCapaChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
        if( e.target.files){
          setCapa(e.target.files[0]);
        }
}, []);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <label htmlFor="capa">Foto da capa</label>
        <input type="file"  id="capa" onChange={handleCapaChange}/>

        <Input name='nome' placeholder='Nome do Jogo'></Input>

        <Select
          isMulti
          name="consoles"
          options={consolesOptions}
        />

        <Button type="submit">Cadastrar jogo</Button>
      </Form>
    </Modal>
  );
};

export default ModalCadastrarJogo;

import React, { useRef, useCallback, useState, useEffect } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Select from '../Select';
import Button from '../../components/Button';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';

import capaPlaceholder from '../../assets/Empty.png';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface IJogo{
  id: string,
  nome: string,
  capa_url: string,
  consoles: string[],
};


interface IOptionsJogos{
  label: string,
  value: string,
  capa_url: string,
  consoles: string[],
}

const ModalDeletarJogo: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();

  const [optionsJogos , setOptionsJogos] = useState<IOptionsJogos[]>([]);

  const [URLcapaJogoSelecionado, setURLcapaJogoSelecionado] = useState<string | null>();

  useEffect(() => {
    async function loadJogos(): Promise<void> {
        api.get<IJogo[]>('/jogos')
        .then(response => {
            response.data.sort((item1, item2) => {
              if(item1.nome < item2.nome) return -1;
              else if(item1.nome > item2.nome) return 1;
              return 0;
            })

            setOptionsJogos(response.data.map( jogo => ({
              label: jogo.nome,
              value: jogo.id,
              capa_url: jogo.capa_url,
              consoles: jogo.consoles
            })));
        })  
    }

    loadJogos();
}, []);

  const handleSubmit = useCallback( async ({id}:any) => {
    api.delete(`/jogos/${id}`)
    .then(response =>{
      addToast({
        type: 'success',
        title: 'Jogo deletado',
        description: 'Jogo deletado com sucesso'
    });
    })
    .catch(err => {
      addToast({
        type: 'error',
        title: 'Erro',
        description: 'Ocorreu um erro ao deletar jogo'
    });
    })

    setIsOpen();

  }, [addToast, setIsOpen]);
  
  async function handleJogoSelecionado(jogoSelecionado: any): Promise<void> {
    setURLcapaJogoSelecionado(jogoSelecionado.capa_url);
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>


        <Select
          name="id"
          options={optionsJogos}
          onChange={(jogoSelecionado: any) => handleJogoSelecionado(jogoSelecionado)}
        />
        {
          URLcapaJogoSelecionado?
          <img src={URLcapaJogoSelecionado} alt="Jogo"/>
          :
          <img src={capaPlaceholder} alt="Jogo"/>
        }
        <Button type="submit">Deletar jogo</Button>
      </Form>
    </Modal>
  );
};

export default ModalDeletarJogo;

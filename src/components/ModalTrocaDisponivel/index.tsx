import React, { useRef, useCallback } from 'react';

import { FiSend, FiArrowRightCircle } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { IHandleEnviarConvite } from '../../pages/TrocasDisponiveis';

interface ITroca {
  id: string,
  descricao: string,
  ativo: boolean,
  nomeJogoOfertado: string,
  nomeJogoDesejado: string,
  urlDaCapaJogoOfertado: string,
  urlDaCapaJogoDesejado: string,
  nomeConsoleJogoOfertado: string,
  nomeConsoleJogoDesejado: string,
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  handleEnviarConvite: ({troca, mensagem}: IHandleEnviarConvite) => void;
  trocaSelecionada: ITroca;
}

const ModalTrocaDisponivel: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  trocaSelecionada,
  handleEnviarConvite,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IHandleEnviarConvite) => {

      handleEnviarConvite({
        troca: trocaSelecionada,
        mensagem: data.mensagem,
      });
      
      setIsOpen();
    },
    [handleEnviarConvite, setIsOpen, trocaSelecionada],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={trocaSelecionada}>

        <div className='capas'>
          <img src={trocaSelecionada.urlDaCapaJogoOfertado} alt={trocaSelecionada.nomeJogoOfertado} />
          <FiArrowRightCircle/>
          <img src={trocaSelecionada.urlDaCapaJogoDesejado} alt={trocaSelecionada.nomeJogoDesejado} />
        </div>

        <Input name="mensagem" placeholder="Mensagem do convite *opcional" />

        <button type="submit">
          <div className="text">Enviar convite</div>
          <div className="icon">
            <FiSend size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
};

export default ModalTrocaDisponivel;

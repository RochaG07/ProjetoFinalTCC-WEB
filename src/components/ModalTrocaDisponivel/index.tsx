import React, { useRef, useCallback } from 'react';

import { FiSend } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { IHandleEnviarConvite, ITroca } from '../../pages/TrocasDisponiveis';

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

        <div id='capas'>
          <img src={trocaSelecionada.urlDaCapaJogoOfertado} alt={trocaSelecionada.nomeJogoOfertado} />
          <img src={trocaSelecionada.urlDaCapaJogoDesejado} alt={trocaSelecionada.nomeJogoDesejado} />
        </div>
        <div id='descricao'>
          <h1>Troca de {trocaSelecionada.username}</h1>
          <p>{trocaSelecionada.descricao}</p>
          <p id='estadoMunicipio'>{trocaSelecionada.estado} - {trocaSelecionada.municipio}</p>
        </div>

        <div id='enviar'>
          <Input  name="mensagem" placeholder="Mensagem para o convite *opcional" />

          <button type="submit">
            <div id="text">Enviar convite</div>
            <div id="icon">
              <FiSend size={24} />
            </div>
          </button>
        </div>
      </Form>
    </Modal>
  );
};

export default ModalTrocaDisponivel;

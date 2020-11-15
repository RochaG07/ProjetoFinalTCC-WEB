import React, { useRef, useCallback, useEffect, useState } from 'react';

import { FiSend, FiArrowRightCircle } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Negociacao } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { IHandleEnviarConvite } from '../../pages/TrocasDisponiveis';

import api from '../../services/api';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalMostrarChat: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit = useCallback(
    async (data: IHandleEnviarConvite) => {

     
      setIsOpen();
    },
    [setIsOpen],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <h1>Chat da negociação vai aqui</h1>
    </Modal>
  );
};

export default ModalMostrarChat;

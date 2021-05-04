import React, { useRef, useCallback, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Button from '../../components/Button';
import api from '../../services/api';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useToast } from '../../hooks/toast';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

const ModalAlterarCartao: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const formRef = useRef<FormHandles>(null);

  const { addToast } = useToast();

  const CARD_ELEMENT_OPTIONS = {
    style: {
      base: {
        color: "#fff",
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#aab7c4",
        },
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a",
      },
    },
  };
  
  const handleChange = (event: any) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  }

  const handleSubmit = useCallback( async () => {
    if (!stripe || !elements) {
      throw new Error();
    }

    const cardElement = elements.getElement(CardElement);
    if (!cardElement) {
      throw new Error();
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (!paymentMethod) {
      throw new Error();
    }
    
    if (error) {
      console.log('[createPaymentMethod error]', error);

      addToast({
        type: 'error',
        title: 'Erro na alteração de cartão',
        description: 'Ocorreu um erro ao fazer a alteração do cartão'
      });
    } else {
      //Salva os dados do cartão no customer
      await api.put('/usuarios/premium/customer', ({paymentMethodId: paymentMethod.id}));

      addToast({
        type: "success",
        title: "Alteração de cartão realizada",
        description: "Alteração realizada com sucesso",
      });
    }

    setIsOpen();
  }, [stripe, elements, addToast, setIsOpen]);

  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
        <div className="card-errors" role="alert">{error}</div>

        <Button type="submit">Alterar cartão de crédito</Button>
      </Form>
    </Modal>
  );
};

export default ModalAlterarCartao;
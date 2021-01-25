import React, { useRef, useCallback, useState } from 'react';

import { FiSend, FiArrowRightCircle } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import Button from '../../components/Button';
import api from '../../services/api';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAuth } from '../../hooks/auth';
import { useHistory } from 'react-router-dom';
import { AxiosResponse } from 'axios';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface IRetryInvoiceWithNewPaymentMethod{
  customerId: string,
  paymentMethodId: string,
  invoiceId: string,
}

const ModalAssinatura: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const formRef = useRef<FormHandles>(null);

  const { usuario, atualizaUsuario } = useAuth();
  const history = useHistory();

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

    let responseUser: AxiosResponse<any>;

    //Cria customer se usuário não tiver registro no stripe
    /*
    if(!usuario.idCustomer){
      responseUser = await api.post('/usuarios/premium/customer');
    } else {
      //Verifica se idCustomer existente é valida
      responseUser = await api.get('/usuarios/premium/customer');
    }
    */
    responseUser = await api.post('/usuarios/premium/customer');

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
    
    //Salva os dados do cartão no customer
    await api.put('/usuarios/premium/customer', ({paymentMethodId: paymentMethod.id}));

    const latestInvoicePaymentIntentStatus = localStorage.getItem(
    'latestInvoicePaymentIntentStatus'
    ); 

    if (error) {
      console.log('[createPaymentMethod error]', error);
    } else {
      const paymentMethodId = paymentMethod.id;

      if (latestInvoicePaymentIntentStatus === 'requires_payment_method') {
        // Update the payment method and retry invoice payment
        const invoiceId = localStorage.getItem('latestInvoiceId');
        
        if(invoiceId){
          retryInvoiceWithNewPaymentMethod({
            customerId: usuario.idCustomer,
            paymentMethodId,
            invoiceId,
          });  
        }

      } else {
        // Create the subscription
        api.post('/usuarios/premium/subscription', ({paymentMethodId: paymentMethod.id}))
        .then((response) => {
          return response.data;
        })
        .then((result) => {
          if (result.error) {
            throw result;
          }
          return result;
        })
        .then((result) => {
          return {
            paymentMethodId: paymentMethodId,
            subscription: result,
          };
        })
        .then(()=>{
          //TODO
          // If attaching this card to a Customer object succeeds,
          // but attempts to charge the customer fail, you
          // get a requires_payment_method error.
        })
        .then(()=>{
          //Subscription complete

          //Atualiza os dados do usuário contidos no localstorage

          const novosDadosDoUsuario = {
            ...usuario,
            premiumAtivo: true,
          }

          console.log(novosDadosDoUsuario);

          atualizaUsuario(novosDadosDoUsuario);

          history.push('/premium');
        })
        .catch((error) => {
          console.log(error);
		    })
      }
    }
  }, [stripe, elements, usuario, history, atualizaUsuario]);

  const retryInvoiceWithNewPaymentMethod = ({ customerId, paymentMethodId, invoiceId }: IRetryInvoiceWithNewPaymentMethod) => {
    console.log('retryInvoiceWithNewPaymentMethod');
  }
  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
        <div className="card-errors" role="alert">{error}</div>

        <Button type="submit">Realizar assinatura premium</Button>
      </Form>
    </Modal>
  );
};

export default ModalAssinatura;

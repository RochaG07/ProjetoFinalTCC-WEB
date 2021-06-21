import React, { useRef, useCallback, useState } from 'react';

import { FormHandles } from '@unform/core';
import { Form } from './styles';
import Modal from '../Modal';
import Button from '../../components/Button';
import api from '../../services/api';

import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

interface IPremium{
  status: string;
  dataExpiracao?: Date;
}

const ModalAssinatura: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
}) => {
  const [error, setError] = useState<string | null>(null);

  const stripe = useStripe();
  const elements = useElements();
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const [carregando, setCarregando] = useState<boolean>(false);

  const { usuario, atualizaUsuario } = useAuth();

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

    setCarregando(true);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });
    if (!paymentMethod) {
      throw new Error();
    }

    if (error) {
      console.log('[createPaymentMethod error]', error);
    } else {
      
      if ( usuario.statusPremium === 'pagamento-recusado') {
        // Update the payment method and retry invoice payment

        await api.put('/usuarios/premium/subscription', ({
          idUser: usuario.id,
          paymentMethodId: paymentMethod.id,
        }))

        atualizaUsuario({
          ...usuario,
          statusPremium: 'ativo'
        });

        addToast({
          type: "success",
          title: "Assinatura realizada",
          description: "Assinatura realizada com sucesso",
        });

      } else {
        try{
          // Cria a Subscription juntamente com o Customer se não existir
          api.post('/usuarios/premium', ({
            idUser: usuario.id,
            paymentMethodId: paymentMethod.id
          }))
          .then(response => {
            const premium: IPremium = response.data.premium;

            console.log(premium);
            console.log(response.data.ultimoInvoiceId);

            if(!premium){
              addToast({
                type: 'error',
                title: 'Erro  na criação no premium',
                description: 'Ocorreu um erro na criação no premium'
              });

              return;
            }

            if(premium.status === 'pagamento-recusado'){
              // If attaching this card to a Customer object succeeds,
              // but attempts to charge the customer fail, you
              // get a requires_payment_method error.
    
              localStorage.setItem('latestInvoiceId', response.data.ultimoInvoiceId);

              atualizaUsuario({
                ...usuario,
                statusPremium: 'pagamento-recusado',
              });
    
              addToast({
                type: 'error',
                title: 'Falha no pagamento',
                description: 'Ocorreu uma falha no pagamento, tente novamente'
              });
    
            } else if(premium.status === 'ativo'){
              ///Subscription complete
              //Atualiza os dados do usuário contidos no localstorage
  
              atualizaUsuario({
                ...usuario,
                statusPremium: 'ativo'
              });
    
              addToast({
                type: "success",
                title: "Assinatura realizada",
                description: "Assinatura realizada com sucesso",
              });
            }
          })
          
        } catch (err){
          addToast({
            type: 'error',
            title: 'Erro',
            description: 'Ocorreu um erro'
          });
        }
      }

      setIsOpen();
    }
  }, [stripe, elements, usuario, atualizaUsuario, addToast, setIsOpen]);
  
  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form onSubmit={handleSubmit} ref={formRef}>
        <CardElement
          id="card-element"
          options={CARD_ELEMENT_OPTIONS}
          onChange={handleChange}
        />
        <div className="card-errors" role="alert">{error}</div>

        <Button loading={carregando} type="submit">Realizar assinatura premium</Button>
      </Form>
    </Modal>
  );
};

export default ModalAssinatura;

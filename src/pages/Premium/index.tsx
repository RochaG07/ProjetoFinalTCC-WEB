import React, { useRef, useCallback } from 'react';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { useHistory } from 'react-router-dom';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import { Container, Content } from './styles';
import { CardElement } from '@stripe/react-stripe-js';

import { Stripe } from '@stripe/stripe-js';

import Button from '../../components/Button';


// Relação entre o frontend e a API do stripe:
// Envia os dados de pagamento do usuário para a API do Stripe e a mesma retorna uma hash
// que é enviada para o backend  

const Premium: React.FC = () => {

    //stripe: Stripe | null | Promise<Stripe | null> 
    
    const { usuario } = useAuth();
    const { addToast } = useToast();

    const history = useHistory();

    const CARD_ELEMENT_OPTIONS = {
        style: {
          base: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            color: "#32325d",
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

    //return<CardElement options={CARD_ELEMENT_OPTIONS} />

    return(
        <Container>
            <Header />
            <Navbar />
            <Content>
                <CardElement options={CARD_ELEMENT_OPTIONS} />

                <Button type="submit">Assinar Premium</Button>
            </Content>
        </Container>
    )
    
};

export default Premium;
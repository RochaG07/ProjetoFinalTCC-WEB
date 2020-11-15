import { useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useCallback, useState } from 'react';
import { useAuth } from '../../hooks/auth';

import { 
    Row, 
    CardElementContainer, 
    CardElement,
    SubmitButton,
    CheckoutError,
} from './styles';

const CheckoutForm: React.FC = ({ children, ...rest }) => {
    const {usuario, logout} = useAuth();

    const [isProcessing, setProcessingTo] = useState(false);
    const [checkoutError, setCheckoutError] = useState();
  
    const stripe = useStripe();
    const elements = useElements();

        
    const handleCardDetailsChange = useCallback(() => {

    }, []);
    
    const handleFormSubmit = useCallback(() => {    
        const detalhesPagamento = {
            name: usuario.nome,
            email: usuario.email,
            address:{
                
            }
        }

        
        
        // Dados utilizados para criar um payment intent no backend
        // É retornado do backend o client_secret

        
    }, []);

    const iframeStyles = {
        base: {
          color: "#fff",
          fontSize: "16px",
          iconColor: "#fff",
          "::placeholder": {
            color: "#87bbfd"
          }
        },
        invalid: {
          iconColor: "#FFC7EE",
          color: "#FFC7EE"
        },
        complete: {
          iconColor: "#cbf4c9"
        }
    };

    const cardElementOpts = {
        iconStyle: "solid",
        style: iframeStyles,
        hidePostalCode: true
      };

    return(
        <form onSubmit={handleFormSubmit}>
            <Row>
            <CardElementContainer>
                <CardElement
                
                onChange={handleCardDetailsChange}
                />
            </CardElementContainer>
            </Row>
            {checkoutError && <CheckoutError>{checkoutError}</CheckoutError>}
            <Row>
            {/* TIP always disable your submit button while processing payments */}
            <SubmitButton disabled={isProcessing || !stripe}>
                {isProcessing ? "Processing..." : `Pay`}
            </SubmitButton>
            </Row>
        </form> 
    )
};

export default CheckoutForm;
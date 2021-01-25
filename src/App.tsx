import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import GlobalStyle from './styles/global';

import AppProvider from './hooks/index';

import Routes from './routes/index';

import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51Ha6nzB0QexI4OApFmIQ6ijwOseWzSpEUyrxvYaBxR1PrUGEHBczDLBPukedUtBNolK0OWM9pBCKzgx2DLToHFIO00INq8z3cY');

const App: React.FC = () => (
    <Elements stripe={stripePromise}>
        <Router>

        <AppProvider>
          <Routes />
        </AppProvider>

        <GlobalStyle />
      </Router>
    </Elements>
);

export default App;
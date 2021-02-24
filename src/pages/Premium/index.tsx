import React, { useRef, useCallback, useState } from 'react';

import { useAuth } from '../../hooks/auth';
import { useToast } from '../../hooks/toast';

import { useHistory } from 'react-router-dom'; 

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import api from '../../services/api';
import ModalAssinatura from '../../components/ModalAssinatura';

import { Container, Content } from './styles';

import Button from '../../components/Button';

// Relação entre o frontend e a API do stripe:
// Envia os dados de pagamento do usuário para a API do Stripe e a mesma retorna uma hash
// que é enviada para o backend  

const Premium: React.FC = () => {
    const { usuario } = useAuth();

    const [modalOpen, setModalOpen] = useState(false);

    async function handleAssinarPremium(): Promise<void> {
      // Chamar a rota de iniciar sessao no backend 
      toggleModal();
    }

    function toggleModal(): void {
      setModalOpen(!modalOpen);
    }

    function handleMudarMetodoDePagamento(): void {
      api.get('/usuarios/premium/customer')
      .then((response) => {
        console.log(response);
      })
    }

  if(!usuario.idCustomer){
    return(
      <Container>
        <Header />
        <Navbar selectedPage={'premium'}/>
        <Content>
          <ModalAssinatura
          isOpen={modalOpen}
          setIsOpen={toggleModal}
          />
          <Button onClick={handleAssinarPremium}>Assinar Premium</Button>
        </Content>
      </Container>
    )
  } else {
    return(
      <Container>
        <Header />
        <Navbar selectedPage={'premium'}/>
        <Content>
          <h1>Usuário premium</h1>
          <Button onClick={handleMudarMetodoDePagamento}>Mudar método de pagamento</Button>
          <Button onClick={() => {}}>Cancelar premium</Button>
        </Content>
      </Container>
    )
  }

    
};

export default Premium;
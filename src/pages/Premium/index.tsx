import React, { useState } from 'react';

import { useAuth } from '../../hooks/auth';

import Header from '../../components/Header';
import Navbar from '../../components/Navbar';

import ModalAssinatura from '../../components/ModalAssinatura';
import ModalAlterarCartao from '../../components/ModalAlterarCartao';

import { Container, Content } from './styles';

import { confirmAlert } from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css'

import Button from '../../components/Button';

import api from '../../services/api';
import ConfirmAlert from '../../components/ConfirmAlert';

// Relação entre o frontend e a API do stripe:
// Envia os dados de pagamento do usuário para a API do Stripe e a mesma retorna uma hash
// que é enviada para o backend  

const Premium: React.FC = () => {
    const { usuario, atualizaUsuario } = useAuth();

    const [modalAssinaturaOpen, setModalAssinaturaOpen] = useState(false);
    const [modalAlterarCartaoOpen, setModalAlterarCartaoOpen] = useState(false);

    async function handleAssinarPremium(): Promise<void> {
      toggleModalAssinatura();
    }
    function toggleModalAssinatura(): void {
      setModalAssinaturaOpen(!modalAssinaturaOpen);
    }


    function handleAlterarCartao(): void {
      toggleModalAlterarCartao();
    }
    function toggleModalAlterarCartao(): void {
      setModalAlterarCartaoOpen(!modalAlterarCartaoOpen);
    }

    function handleCancelarAssinaturaPremium(): void {
      confirmAlert({
        customUI: ({ onClose }) => {
          return(
            <ConfirmAlert 
                descricao='Realmente cancelar sua assinatura premium?'
                onClose={onClose} 
                yesFunction={()=>{
                    api.delete(`/usuarios/premium/subscription`);

                    atualizaUsuario({
                        ...usuario,
                        statusPremium: 'cancelado'
                    });   
                    
                    onClose();                       
                }}
            />
          );           
        }       
      });
    }

  if(usuario.statusPremium === 'nao-iniciado'){
    return(
      <Container>
        <Header />
        <Navbar selectedPage={'premium'}/>
        <Content>
          <ModalAssinatura
          isOpen={modalAssinaturaOpen}
          setIsOpen={toggleModalAssinatura}
          />
          <h1>Status do Premium: Não Iniciado</h1>

          <p>Com a assinatura você terá acesso ao seguinte benefício:</p>

          <ul>
            <li>Número ilimitado de trocas mensais.</li>
          </ul>

          <h2>Valor mensal: R$ 10,00</h2>

          <Button onClick={handleAssinarPremium}>Assinar Premium</Button>
        </Content>
      </Container>
    )

  } else if(usuario.statusPremium === 'cancelado') {
    return(
      <Container>
        <Header />
        <Navbar selectedPage={'premium'}/>
        <Content>
        <ModalAssinatura
          isOpen={modalAssinaturaOpen}
          setIsOpen={toggleModalAssinatura}
          />
          <h1>Status do Premium: Cancelado</h1>
          
          <Button onClick={handleAssinarPremium}>Reativar Premium</Button>
        </Content>
      </Container>
    ) 
  } else if(usuario.statusPremium === 'pagamento-recusado') {
    return(
      <Container>
        <Header />
        <Navbar selectedPage={'premium'}/>
        <Content>
        <ModalAssinatura
          isOpen={modalAssinaturaOpen}
          setIsOpen={toggleModalAssinatura}
          />
          <h1>Status do Premium: Pagamento Recusado</h1>
          
          <Button onClick={handleAssinarPremium}>Selecionar outro cartão de crédito</Button>
          <Button onClick={handleCancelarAssinaturaPremium}>Cancelar assinatura premium</Button>
        </Content>
      </Container>
    )
  } else {
    return(
      <Container>
        <Header />
        <Navbar selectedPage={'premium'}/>
        <Content>
          <ModalAlterarCartao
          isOpen={modalAlterarCartaoOpen}
          setIsOpen={toggleModalAssinatura}
          />
          <h1>Status do Premium: Ativo</h1>

          <Button onClick={handleAlterarCartao}>Alterar cartão de crédito</Button>
          <Button onClick={handleCancelarAssinaturaPremium}>Cancelar assinatura premium</Button>
        </Content>
      </Container>
    )
  }
  

};

export default Premium;
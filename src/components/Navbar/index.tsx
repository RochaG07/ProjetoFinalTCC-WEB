import React from 'react';

import { Container, NavbarLink, Links } from './styles';

interface NavbarProps {
    selectedPage?: 
    'trocas-disponiveis' |
    'negociacoes' |
    'nova-troca' |
    'minhas-trocas' |
    'meu-perfil' |
    'premium' 
}

const Navbar: React.FC<NavbarProps> = ({ selectedPage, ...rest }) => {
    return(
        <Container>
            <Links>
            {
                selectedPage === 'trocas-disponiveis'&&
                <NavbarLink isSelected to={'/trocas-disponiveis'}><p>Trocas disponíveis</p></NavbarLink>
            }
            {
                selectedPage !== 'trocas-disponiveis'&&
                <NavbarLink to={'/trocas-disponiveis'}><p>Trocas disponíveis</p></NavbarLink>
            }   

            {
                selectedPage === 'negociacoes'&&
                <NavbarLink isSelected to={'/negociacoes'}><p>Negociações em andamento</p></NavbarLink>
            }
            {
                selectedPage !== 'negociacoes'&&
                <NavbarLink to={'/negociacoes'}><p>Negociações em andamento</p></NavbarLink>
            }  

            {
                selectedPage === 'nova-troca'&&
                <NavbarLink isSelected to={'/nova-troca'}><p>Nova troca</p></NavbarLink>
            }
            {
                selectedPage !== 'nova-troca'&&
                <NavbarLink to={'/nova-troca'}><p>Nova troca</p></NavbarLink>
            }  

            {
                selectedPage === 'minhas-trocas'&&
                <NavbarLink isSelected to={'/minhas-trocas'}><p>Minhas trocas</p></NavbarLink>
            }
            {
                selectedPage !== 'minhas-trocas'&&
                <NavbarLink to={'/minhas-trocas'}><p>Minhas trocas</p></NavbarLink>
            }  

            {
                selectedPage === 'meu-perfil'&&
                <NavbarLink isSelected to={'/meu-perfil'}><p>Meu perfil</p></NavbarLink>
            }
            {
                selectedPage !== 'meu-perfil'&&
                <NavbarLink to={'/meu-perfil'}><p>Meu perfil</p></NavbarLink>
            }  

            {
                selectedPage === 'premium'&&
                <NavbarLink isSelected to={'/premium'}><p>Premium</p></NavbarLink>
            }
            {
                selectedPage !== 'premium'&&
                <NavbarLink to={'/premium'}><p>Premium</p></NavbarLink>
            }  
            </Links>
        </Container>
    )
};

export default Navbar;
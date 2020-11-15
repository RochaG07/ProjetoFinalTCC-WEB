import React from 'react';

import { Container, NavbarLink } from './styles';

const Navbar: React.FC = ({ children, ...rest }) => {
    return(
        <Container>

            <NavbarLink to={'/trocas-disponiveis'}><p>Trocas disponíveis</p></NavbarLink>
            <NavbarLink to={'/negociacoes'}><p>Negociações em andamento</p></NavbarLink>
            <NavbarLink to={'/nova-troca'}><p>Nova troca</p></NavbarLink>
            <NavbarLink to={'/minhas-trocas'}><p>Minhas trocas</p></NavbarLink>
            <NavbarLink to={'/meu-perfil'}><p>Meu perfil</p></NavbarLink>
            <NavbarLink to={'/premium'}><p>Premium</p></NavbarLink>

        </Container>
    )
};

export default Navbar;
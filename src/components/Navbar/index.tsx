import React from 'react';

import { Container, NavbarLink, Links } from './styles';

import {useAuth} from '../../hooks/auth';
interface NavbarProps {
    selectedPage?: 
    'trocas-disponiveis' |
    'negociacoes' |
    'nova-troca' |
    'minhas-trocas' |
    'meu-perfil' |
    'premium' | 
    'admin'
}

const Navbar: React.FC<NavbarProps> = ({ selectedPage, ...rest }) => {
    const {usuario} = useAuth();

    return(
        <Container>
            <Links>
                <NavbarLink isselected={selectedPage === 'trocas-disponiveis'} to={'/trocas-disponiveis'}><p>Trocas disponíveis</p></NavbarLink>

                <NavbarLink isselected={selectedPage === 'negociacoes'} to={'/negociacoes'}><p>Negociações em andamento</p></NavbarLink>
                        
                <NavbarLink isselected={selectedPage === 'nova-troca'}  to={'/nova-troca'}><p>Nova troca</p></NavbarLink>

                <NavbarLink isselected={selectedPage === 'minhas-trocas'} to={'/minhas-trocas'}><p>Minhas trocas</p></NavbarLink>

                <NavbarLink isselected={selectedPage === 'meu-perfil'} to={'/meu-perfil'}><p>Meu perfil</p></NavbarLink>

                <NavbarLink isselected={selectedPage === 'premium'} to={'/premium'}><p>Premium</p></NavbarLink>

                {
                    usuario.possuiStatusDeAdm &&
                    <NavbarLink isselected={selectedPage === 'admin'} to={'/admin'}><p>Admin</p></NavbarLink>
                }     
            </Links>
            
        </Container>
    )
};

export default Navbar;
import React, { useState } from 'react';

import { Container, NavbarLink, EsconderNavbarDiv, Links } from './styles';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';

const Navbar: React.FC = ({ children, ...rest }) => {

    const [isVisible, setIsVisible] = useState<boolean>(true);

    function toggleNavBar():void {
        setIsVisible(!isVisible);
    }

    return(
        <Container>
            <EsconderNavbarDiv>
                <button onClick={toggleNavBar}>
                    {
                        isVisible?
                        <FiArrowUp />
                        :
                        <FiArrowDown />
                    }
                </button>
            </EsconderNavbarDiv>

            {
                isVisible&&
                <Links>
                    <NavbarLink to={'/trocas-disponiveis'}><p>Trocas disponíveis</p></NavbarLink>
                    <NavbarLink to={'/negociacoes'}><p>Negociações em andamento</p></NavbarLink>
                    <NavbarLink to={'/nova-troca'}><p>Nova troca</p></NavbarLink>
                    <NavbarLink to={'/minhas-trocas'}><p>Minhas trocas</p></NavbarLink>
                    <NavbarLink to={'/meu-perfil'}><p>Meu perfil</p></NavbarLink>
                    <NavbarLink to={'/premium'}><p>Premium</p></NavbarLink>

                </Links>
            }

        </Container>
    )
};

export default Navbar;
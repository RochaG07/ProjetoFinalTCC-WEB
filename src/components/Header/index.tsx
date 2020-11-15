import React from 'react';

import { Link } from 'react-router-dom';
import {useAuth} from '../../hooks/auth';
import { FiPower } from 'react-icons/fi';
import { Container, HeaderContent, Profile } from './styles';

const Header: React.FC = ({ children, ...rest }) => {
    const {usuario, logout} = useAuth();

    return(
        <Container>
                <HeaderContent>
                    <Profile>
                        <img 
                            src={usuario.avatar_url}
                            alt={usuario.nome}
                        />
                        <div>
                            <span>Bem-vindo, </span>
                            
                            <strong>{usuario.nome}</strong>
                            
                        </div>
                    </Profile>
    
                    <button type='button' onClick={logout}>
                        <FiPower />
                    </button>
                </HeaderContent>
        </Container>
    )
};

export default Header;
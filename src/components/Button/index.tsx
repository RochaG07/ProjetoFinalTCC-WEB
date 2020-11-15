import React,{ ButtonHTMLAttributes } from 'react';

import { Container } from './styles';

//type -> Forma de criar tipagens de objetos compostas de outras tipagens
// (Tipo interface só quem sem sobreescrever nada)
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
        <Container type="button" {...rest}>
            {loading? 'Carregando... ' : children}
        </Container>

    );

export default Button;
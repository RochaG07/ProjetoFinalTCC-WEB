import React,{ ButtonHTMLAttributes } from 'react';

import { Container } from './styles';
import ReactLoading from 'react-loading';

//type -> Forma de criar tipagens de objetos compostas de outras tipagens
// (Tipo interface só quem sem sobreescrever nada)
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    loading?: boolean;
};

const Button: React.FC<ButtonProps> = ({ children, loading, ...rest }) => (
        <Container isLoading={loading} type="button"  {...rest}>
            {loading? <ReactLoading className="barra" type={'cylon'} color={'#fff'} height={40} width={40} /> : children}
        </Container>

    );

export default Button;
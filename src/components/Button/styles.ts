import styled, {css} from 'styled-components';
import { shade, grayscale } from 'polished';

interface ContainerProps{
    isLoading?: boolean;
}

export const Container = styled.button<ContainerProps>`
    background: #68a;
    height: 56px;
    border-radius: 10px;
    border: 0;
    padding: 0 16px;
    color: #fff;
    width: 100%;
    font-weight: 500;
    margin-top: 16px;
    transition: background-color 0.2s;

    &:hover { 
        background: ${shade(0.2, '#68a')}
    }

    .barra{
        margin: auto; 
    }

    ${(props) => 
        props.isLoading && 
        css`
            background-color: ${grayscale('#68a')};
            pointer-events: none;
        `}
`;
import styled from 'styled-components';
import {saturate, lighten} from 'polished';

export const Container = styled.header`
    padding: 32px 0;
    background: #1c2024;
`;

export const HeaderContent = styled.div`
    max-width: 1120px;
    margin: 0 auto;
    display: flex;
    align-items: center;

    >img {
        height: 80px;
    }

    div.icones {
        margin-left: auto;

        button {
        background: transparent;
        border: 0;
        margin-left: 20px;

            svg {
                color: #999591;
                width: 20px;
                height: 20px;
            } 
        }

        button.sino :hover {
            color: ${saturate(0.4, '#68a')};
        }

        button.sair{
            margin-left: 4em;
        }

        button.sair :hover {
            color: red;
        }

    }
`;

export const Profile = styled.div`
    display: flex;
    align-items: center;
    margin-left: 80px;

    img {
        width: 56px;
        height: 56px;
        border-radius: 50%;
    }

    div {
        display: flex;
        flex-direction: column;
        margin-left: 16px;
        line-height: 24px;
    }

    span {
        color: #999591;
    }

    a {
        text-decoration: none;
        color: #68a;

        &:hover {
            opacity: 0.8;
        }

    }

    strong {
        color: #68a;
    }
`;

export const ContainerAvisoNotificacao = styled.div`
    border-radius: 2px;
    padding: 4px;
    background-color: #68a;
    width: 92%;

    margin: auto;

    display: flex;
    flex-direction: column;
    margin-top: 2px;
    cursor: pointer; 

    #titulo{
        color: #1c2024;
        font-weight: 500;
        font-size: 1.2em;
    }

    #conteudo{
        color: #1c2024;
        font-weight: 300;
    }

    #data{
        color: ${lighten(0.2, '#1c2024')};
        font-weight: 100;
    }

    :nth-child(even){
        background-color: ${lighten(0.05, '#68a')};
    }

    :hover{
        background-color: ${lighten(0.1, '#68a')};
    }
`;
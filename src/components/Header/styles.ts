import styled from 'styled-components';
import {saturate, shade} from 'polished';

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
            svg.admIcon {
                color: #b58435;
            } 

        }

        button.adm :hover{
            color: ${saturate(0.8, '#b58435')}
        }

        button.sair :hover {
            color: red;
        }

        button.sino :hover {
            color: ${saturate(0.4, '#68a')};
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

export const MenuAdm = styled.ul`
    
    list-style-type:none;

    li{
        
    }

    button{
        background: #68a;
        height: 30px;
        border-radius: 10px;
        border: 0;
        padding: 0 5px;
        color: #fff;
        width: 100%;
        font-weight: 500;
        margin-top: 5px;

        transition: background-color 0.2s;

    }


    button :hover { 
        background: ${shade(0.2, '#68a')}
    }
`;

export const Aviso = styled.p`
`;

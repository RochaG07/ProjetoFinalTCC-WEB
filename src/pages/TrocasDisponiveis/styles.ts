import styled, {keyframes} from 'styled-components';
import { shade } from 'polished';

import { Form } from '@unform/web';

import arrow from '../../assets/pngkey.com-arrow-icon-png-120716.png';

const slide = keyframes`
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(10px);
    }
`;

export const Container = styled.div`
`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;

	min-height : 900px;
	margin-left : 14%;
	margin-right : 14%;

    background-color: #181b1f;
`;

export const Filtro = styled(Form)`
    background-color: ${shade(0.2, '#181b1f')};

    display: flex;
    flex-direction: row;
    align-items: initial;

	margin-left : 14%;
	margin-right : 14%;

    div{
        margin: 0 5px 0 5px;


    }

    div:first-child{
        margin-bottom: 10px;
    }

    .selects{
        margin-top: 10px;
        margin-bottom: -9px;
        width: 90%;
    }

    .botoes{
        width: 50%;

    }
`;  

export const Troca = styled.div`
    margin-top: 35px;
    border-radius: 10px;
	height : 220px;
    background-color: #68a;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    border: 4px solid #68a;
    

    width: 92%;

    display: flex;
    justify-content: center;

    &:hover{
        border: 4px solid ${shade(0.3, '#68a')};
        background-color: ${shade(0.1, '#68a')};
        animation: ${slide} 0.4s;
        animation-fill-mode: forwards;

        cursor: pointer;
    }

    &:active{
    }

    div.specJogo{
        margin: auto;

        color: #08090A;

        h1{
            font-size: 1.6em;
            font-weight: 300;
        }   

        p{
            font-size: 1em;
            font-weight: 100;
        }
        
        #por{
            font-weight: bold;
            text-align: center;
            margin: 15px 0 15px 0;

        }
    }

    div.capas{
        display: flex;
        flex-direction: row;
        align-items: center;

        background-image: url(${arrow});
        background-repeat: no-repeat;
        background-position: center;
    
        img{

            border: 1px solid black;
            height: 160px;
            width: 100px;
            margin: 0 10px 0 10px;
        }

        img:first-child{
            margin-right: 20%;
        }
    }
`;


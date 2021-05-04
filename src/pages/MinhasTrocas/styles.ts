import styled from 'styled-components';
import { lighten } from 'polished';

import arrow from '../../assets/pngkey.com-arrow-icon-png-120716.png';

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

export const Troca = styled.div`
    margin-top: 35px;
    border-radius: 5px;
	height : 220px;
    background-color: ${lighten(0.05, '#68a')};
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    border: 4px solid #68a;

    width: 92%;

    display: flex;
    justify-content: center;
        
    div.specJogo{
        margin: auto;

        color: #123;

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

    div.icones{
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;

        margin-top: 10px;
        margin-right: 10px;

        button {
            background: transparent;
            border: 0;
            margin-bottom: 10px;

            svg {
                width: 20px;
                height: 20px;
                color: #123;
            } 
        }

        button.excluir :hover {
            color: red;
        } 

        button.convites :hover {
            color: ${lighten(0.2, '#123')};
        } 

    }
`;
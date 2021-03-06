import styled from 'styled-components';
import { shade } from 'polished';

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

    label{
        color: #fff;

    }
`;

export const Capas = styled.div`

    img{
        border: 1px solid black;
        height: 320px;
        width: 200px;
        margin: 10px 10px 10px 10px;
    }
`;

export const Ofertado = styled.div`

`;

export const Desejado = styled.div`
`;

export const Troca = styled.div`
    margin-top: 35px;
    border-radius: 5px;
	height : 220px;
    background-color: #68a;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);

    width: 92%;

    display: flex;
    justify-content: center;

    &:hover{
        background: ${shade(0.2, '#68a')};
        cursor: pointer;
    }
        

    div.specJogo{
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        vertical-align: middle;

        h1{
            font-size: 35px;
            color: #08090A;
        }
        p{
            font-size: 15px;
            color: #999591;
        }
    }

    div.capas{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0 10px 0;

        background-color: #68a;
        border-radius: 5px;

        img{

            border: 1px solid black;
            height: 160px;
            width: 100px;
            margin: 0 10px 0 10px;
        }

        svg{
            height: 80px;
            width: 50px;
            margin: 0 10px 0 10px;
            color: #999591;

        }
    }
`;
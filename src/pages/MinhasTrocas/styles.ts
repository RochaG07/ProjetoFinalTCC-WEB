import styled from 'styled-components';
import { lighten} from 'polished';

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
    background-color: #68a;
    box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
    border: 2px solid #68a;

    width: 92%;

    display: flex;
    justify-content: center;


        
    div.specJogo{
        text-align: center;
        margin-left: auto;
        margin-right: auto;
        vertical-align: middle;

        h1{
            font-size: 35px;
            color: #123;
        }
        p{
            font-size: 15px;
            color: #123;
        }
    }

    div.capas{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0 10px 0;

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

    div.icones{
        display: flex;
        flex-direction: column;
        align-items: center;
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

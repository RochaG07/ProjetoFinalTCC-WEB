import styled from 'styled-components';
import { mix } from 'polished';

export const Container = styled.div`
display: flex;
flex-direction: column;
background-color: #24292E;
padding: 10px;
border: 4px solid #68a;
border-radius: 10px;

width: 600px;
height: 200px;

h1, p {
    color: #fff;
    text-align: center;
}

#botoes{
    
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-top: 20px;

    button {
        font-weight: 600;
        border-radius: 8px;
        border: 0;
        background: #68a;
        color: #fff;

        width: 94%;
        height: 56px;
    }

    button:nth-child(even){
        margin-left: 10px;
    }

    #botaoSim:hover{
        background-color: ${mix(0.8, '#68a', 'green')};
    }

    #botaoNao:hover{
        background-color: ${mix(0.8, '#68a', 'red')};
    }
}


`;
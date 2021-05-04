import styled from 'styled-components';
import {lighten, mix} from 'polished';

export const Convite = styled.div`
  border-radius: 10px 10px 5px 5px;

  height : 220px;
  background-color: ${lighten(0.05, '#68a')};
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
  width: 92%;

  margin: auto;

  display: flex;
  flex-direction: column;

  #titulo{
    background-color: #123;
    border-radius: 5px 5px 0 0;
    display: flex;


    border-bottom: 1px solid #000;

    h1 {
      margin-left: 30%;

      font-weight: 500;
      color: #fff;
      font-size: 1.6em;
    }
  }

  #descricao{
    margin: auto 0 auto 0;

    text-align: center;
    font-weight: 400;
    color: #000;
    font-size: 1.5em;
  }

  #botoes{
    button:first-of-type{
      margin-left : 38.5%;
      margin-right : 4%;

    }

    button{
      margin-bottom: 4px;

      border-radius: 5px;

      //margin-right : 14%;

      color: #fff;
      background-color: #123;

      border: 4px solid #123;
    }

    #aceitar:hover{
      background-color: ${mix(0.8, '#123', 'green')};
      border: 4px solid ${mix(0.8, '#123', 'green')};
    }

    #recusar:hover{
      background-color: ${mix(0.8, '#123', 'red')};
      border: 4px solid ${mix(0.8, '#123', 'red')};
    }

  }





`;

import styled from 'styled-components';
import {shade} from 'polished';

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

export const Negociacao = styled.div`
  border-radius: 10px 10px 5px 5px;

  height : 220px;
  background-color: #68a;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
  margin-top: 35px;
  width: 92%;

  display: flex;
  flex-direction: column;

  .titulo{
    display: flex;
    align-items: center;
    justify-content: space-between;
    //margin: 0 auto;
    width: 100%;
    
    background-color: #123;
    border-radius: 5px 5px 0 0;

    border-bottom: 1px solid #000;

    h1 {
      margin-left: auto;
      font-weight: 500;
      color: #fff;
      font-size: 1.6em;
    }

    .icones{
      margin-left: auto;
      margin-right: 4px;

      button {
        background: transparent;
        border: 0;
        svg {
          width: 20px;
          height: 20px;
          color: #68a;
        } 
        svg:hover {
          color: red;
        } 
      }
    }

   
  }

  .descricao{
    margin: auto 0 auto 0;

    text-align: center;
    font-weight: 400;
    color: #000;
    font-size: 1.5em;
  }

  button{
    margin-bottom: 4px;

    border-radius: 5px;

    margin-left : 14%;
    margin-right : 14%;

    color: #fff;
    background-color: #123;

    border: 4px solid #123;
  }

  button:hover{
    background-color: ${shade(0.2, '#123')};
  }

`;

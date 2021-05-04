import styled from 'styled-components';
import { lighten, shade } from 'polished';
import { Form as Unform } from '@unform/web';

export const Negociacao = styled.div`
  margin-top: 35px;
  border-radius: 5px;
  height : 220px;
  background-color: #68a;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);

  width: 92%;

  display: flex;
  justify-content: center;

  h1 {
    font-weight: 500;
    font-size: 1.6em;
    margin-bottom: 20px;
  }

  
  &:hover{
    background: ${shade(0.2, '#68a')};
    cursor: pointer;
  }
`;

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  

  h1 {
    font-weight: 500;
    font-size: 1.6em;
  }
  h2 {
    font-weight: 100;
    font-size: 1.3em;
    margin-bottom: 20px;
  }

  .usuariosEmSala{

    ::before{
      content: 'Usuários em sala: ';
    };

  }

  #chat{
    width: 100%;
    height: 450px;
    border: none;
    overflow-y: scroll;
    border-radius: 4px;
    background-color: #1c2024;
    border: 4px solid #1c2024;

    ::-webkit-scrollbar {
      width: 10px;
    }
    ::-webkit-scrollbar-track {
      background: #2f363d; 
    }
    ::-webkit-scrollbar-thumb {
      background: #123; 
    }
    ::-webkit-scrollbar-thumb:hover {
      background: #68a; 
    }

    p{
      font-size: 1.1em;
      background-color: #68a;
      padding: 4px 8px;
    }

    p:nth-child(odd){
      background-color: ${lighten(0.1, '#68a')};;
    }
  }

  #enviarMensagem{
    display: flex;

    margin-top: 8px;

    button {
      
      align-self: flex-end;

      font-weight: 600;
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
      border: 0;
      background: #123;
      color: #fff;

      display: flex;
      flex-direction: row;
      align-items: center;

      #text {
        padding: 16px 24px;
      }

      #icon {
        display: flex;
        color: #000;
        padding: 16px 16px;
        background: #68a;
        border-radius: 0 8px 8px 0;
        margin: 0 auto;
      } 
    }
  }

`;

import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

import arrow from '../../assets/pngkey.com-arrow-icon-png-120716.png';

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  #capas{
    display: flex;
    flex-direction: row;
    align-items: center;

    margin-bottom: 10px;

    background-image: url(${arrow});
    background-repeat: no-repeat;
    background-position: 40% 50%;

    img{
      border: 1px solid black;
      height: 160px;
      width: 100px;
      margin: 0 10px 0 10px;
    }

    img:first-child{
      margin-right: 20%;
      margin-left: 23%;
    }
  }

  #descricao{
    h1 {
      font-weight: 400;
      font-size: 1.7em;
      margin-bottom: 20px;
    }

    p {
      font-size: 1em;
      font-weight: 100;
    }

    #estadoMunicipio{
      margin: 10px 0 10px 0;
      font-size: 0.8em;
      font-weight: 50;
    }
  }

  #enviar{
    margin-top: 10px;

    button {
      margin: auto;
      margin-top: 40px;

      justify-content: center;

      font-weight: 600;
      border-radius: 8px;
      border: 0;
      background: #123;
      color: #fff;

      display: flex;
      flex-direction: row;
      align-items: center;

      border: 2px solid #123;

      #text {
        padding: 16px 24px;
        font-size: 1em;
        font-weight: 100;
        color: #fff;

      }

      #icon {
        display: flex;
        color: #fff;
        padding: 16px 16px;
        border-radius: 0 8px 8px 0;
        margin: 0 auto;
      }

      :hover{
        border: 2px solid #68a;

        #text{
          color: #68a;
        }
        #icon{
          color: #68a;
        }
      }
    }
  }


`;

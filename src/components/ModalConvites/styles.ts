import styled from 'styled-components';
import { Form as Unform } from '@unform/web';

export const Convite = styled.div`
  margin-top: 35px;
  border-radius: 5px;
  height : 220px;
  background-color: #68a;
  box-shadow: 5px 5px 10px rgba(0,0,0,0.5);
  border: 2px solid #68a;

  width: 92%;

  display: flex;
  justify-content: center;
`;
export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  h1 {
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  button {
    margin-top: 48px;
    align-self: flex-end;
  }

  button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #123;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    .text {
      padding: 16px 24px;
    }

    .icon {
      display: flex;
      color: #000;
      padding: 16px 16px;
      background: #68a;
      border-radius: 0 8px 8px 0;
      margin: 0 auto;
    }
  }

  div.capas{
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 10px 0 10px 0;

        background-color: #123;
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

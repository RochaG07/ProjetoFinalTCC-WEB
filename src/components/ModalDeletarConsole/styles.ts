import styled from 'styled-components';
import { Form as Unform } from '@unform/web';
import { mix } from 'polished';

export const Form = styled(Unform)`
  padding: 48px 40px;
  display: flex;
  flex-direction: column;

  button {
    font-weight: 600;
    border-radius: 8px;
    border: 0;
    background: #123;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;

    :hover{
      background-color: ${mix(0.8, '#123', 'red')};
    }
  }
`;

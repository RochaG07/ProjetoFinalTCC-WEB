import styled from 'styled-components';
import { shade } from 'polished';

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
    font-weight: 600;
    font-size: 36px;
    line-height: 36px;
    margin-bottom: 40px;
  }

  
  &:hover{
    background: ${shade(0.2, '#68a')};
    cursor: pointer;
  }
`;

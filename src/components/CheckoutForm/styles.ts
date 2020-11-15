import styled from 'styled-components';

export const Row = styled.div`
  width: 475px;
  margin: 30px auto;
  box-shadow: 0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08),
    inset 0 1px 0 #829fff;
  border-radius: 4px;
  background-color: #7795f8;
  position: relative;
`;

export const CardElementContainer = styled.div`
    height: 40px;
    display: flex;
    align-items: center;

    & .StripeElement {
        width: 100%;
        padding: 15px;
    }
`;

export const CardElement = styled.div`

`;

export const SubmitButton = styled.button`
  display: block;
  height: 40px;
  width: 100%;
  font-size: inherit;
  background-color: ${props => (props.disabled ? "#7795f8" : "#f6a4eb")};
  box-shadow: ${props =>
    props.disabled
      ? "none"
      : "0 6px 9px rgba(50, 50, 93, 0.06), 0 2px 5px rgba(0, 0, 0, 0.08), inset 0 1px 0 #ffb9f6;"};
  border-radius: 4px;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  color: #fff;
  font-weight: 600;
  cursor: pointer;
`;

export const CheckoutError = styled.div`

`;

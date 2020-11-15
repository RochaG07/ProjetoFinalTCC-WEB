
import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
    height: 100vh;

    display: flex;
    align-items: stretch; 
    background: #24292E;

`;

export const Content = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    width: 100%;
    //max-width: 700px; 
`;

const appearFromRight = keyframes`
    from {
        opacity: 0;
        transform: translateX(50px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
`;

export const AnimationContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    animation: ${appearFromRight} 1s;

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;

        h1 {
            margin-bottom: 24px;
            color: #fff;
        }

        a {
            color: #68a; 
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#68a')}
            }
        }
    }

    > a {
        color: #68a;
        display: block;
        margin-top: 24px;
        text-decoration: none;
        transition: color 0.2s;

        display: flex;
        align-items: center;


        &:hover {
            color: ${shade(0.2, '#68a')}
        }
    }
`;

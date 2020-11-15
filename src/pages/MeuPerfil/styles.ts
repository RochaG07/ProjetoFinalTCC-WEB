import styled from 'styled-components';
import { shade } from 'polished';

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

    form {
        margin: 80px 0;
        width: 340px;
        text-align: center;
        display: flex;
        flex-direction: column; 

        a {
            color: #f4ede8; 
            display: block;
            margin-top: 24px;
            text-decoration: none;
            transition: color 0.2s;

            &:hover {
                color: ${shade(0.2, '#f4ede8')}
            }
        }
    }
`;


export const AvatarInput = styled.div`
    margin-bottom: 32px;
    position: relative;
    align-self: center;

    img {
        width: 186px;
        height: 186px;
        border-radius: 50%;
    }

    label {
        position: absolute;
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-color: #68a;
        right: 0;
        bottom: 0;
        cursor: pointer;
        transition: background-color 0.2s;

        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background-color: ${shade(0.2, '#68a')};
        }
    }

    input {
        display: none;
    }

    svg {
        width: 20px;
        height: 20px;
        color: #312e38;
    }
`;


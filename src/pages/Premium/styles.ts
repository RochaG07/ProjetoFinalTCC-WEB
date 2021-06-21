import styled from 'styled-components';

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

    h1{
        margin-bottom: 20px;
    }

    h2{
        margin-top: 40px;
    }

    p{
        margin-bottom: 5px;    
    }



    h1, h2, p, li{
        color: #fff;
    }

`;

export const Form = styled.form`
    margin-top: 35px;

    min-height : 900px;
    min-width : 900px;

    .card-errors{
        color: red;
    }
`;
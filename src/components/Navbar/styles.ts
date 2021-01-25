import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten, shade } from 'polished';

//import BG from '../../assets/dark-mosaic.png';

export const Container = styled.div`
`;

export const Links = styled.nav`
    background-color: ${shade(0.8, '#123')};

    display: flex;
    flex-direction: row;
    justify-content: space-around;

    border-top: 1px solid ${shade(0.8, '#123')};
    border-bottom: 1px solid ${shade(0.8, '#123')};
    margin-left : 14%;
	margin-right : 14%;
`;


export const EsconderNavbarDiv = styled.div`
    display: flex;
    background-color: #1C2024;  
    justify-content: space-around;
    
    button{

        background-color: #1c2024;
        width: 40px;
        height: 20px;

        border-top-left-radius: 100px;
        border-top-right-radius: 100px;
        border: none;

        
        svg{
            color: #68a;
            width: 20px;
            height: 20px;
        }
    }

    button :hover{
        svg{
            color: #123;
        }
    }
`;

export const NavbarLink = styled(Link)`
    color: #999591;

    background-color: #123;
	background-image: linear-gradient(to bottom, #0003, transparent);
	border-bottom: 1px solid #0003;
	box-shadow: 0 0 32px #0003;

    padding:20px 20px;
    font-size:12px;
    text-decoration:none;
    letter-spacing:2px;
    text-transform:uppercase;
    
    :hover{
        background: ${lighten(0.03, '#123')};
        border-bottom: 1px solid #68a;
    } 
    
`;

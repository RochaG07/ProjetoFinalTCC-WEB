import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten, shade } from 'polished';

//import BG from '../../assets/dark-mosaic.png';

export const Container = styled.nav`
    background-color: ${shade(0.8, '#123')};

    display: flex;
    flex-direction: row;
    justify-content: space-around;

    border-top: 1px solid ${shade(0.8, '#123')};
    border-bottom: 1px solid ${shade(0.8, '#123')};
    margin-left : 14%;
	margin-right : 14%;

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

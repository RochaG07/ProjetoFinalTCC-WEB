import styled, {css, keyframes} from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten, shade } from 'polished';

interface NavbarLinkProps {
    isselected: boolean ;
}

const slide = keyframes`
    0%, 100% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(20px);
    }
`;

export const Container = styled.div`
    display: flex;
    flex-direction: row;
`;

export const Links = styled.nav`
    background-color: ${shade(0.8, '#123')};

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    //width: 10em;

    padding-left: 0.9em;
    position: absolute;
    left: 0;
`;


export const NavbarLink= styled(Link)<NavbarLinkProps>`
    color: #999591;

    width: 8rem;
    height: 6rem;

    background-color: #123;
	background-image: linear-gradient(to bottom, #0003, transparent);

	border-right: 1px solid #0003;
	box-shadow: 0 0 32px #0003;

    margin-bottom: 0.2rem; 

    padding: 1rem;
    font-size: 0.75rem;
    text-decoration:none;
    letter-spacing:2px;
    text-transform:uppercase;
    
    :hover{
        border-right: 1px solid #68a;
    } 

    ${(props) => 
        props.isselected && 
        css`
            background: ${lighten(0.03, '#123')};
            animation: ${slide} 0.8s;
        `}


`;

import styled, {css, keyframes} from 'styled-components';
import { Link } from 'react-router-dom';
import { lighten, shade } from 'polished';

interface NavbarLinkProps {
    isSelected?: boolean;
}

const appearFromLeft = keyframes`
    from {
        transform: translateX(-20px);
    }
    to {
        transform: translateX(0);
    }
`;

export const Container = styled.div`
`;

export const Links = styled.nav`
    background-color: ${shade(0.8, '#123')};

    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    width: 9.4rem;

    padding: 1.3rem;
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
        props.isSelected && 
        css`
            background: ${lighten(0.03, '#123')};
            animation: ${appearFromLeft} 1s;
        `}


`;

import { createGlobalStyle } from 'styled-components';

import BG from '../assets/dark-mosaic.png';

import "@fontsource/roboto-slab" 

export default createGlobalStyle`   

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        outline: 0;
    }

    body {
        background: #08090A;
        background-image : url(${BG});

        -webkit-font-smoothing: antialiased;

        
        ::-webkit-scrollbar {
        width: 16px;
        }
        ::-webkit-scrollbar-track {
        background: #2f363d; 
        }
        ::-webkit-scrollbar-thumb {
        background: #123; 
        }
        ::-webkit-scrollbar-thumb:hover {
        background: #68a; 
        }
    }

    body, input, button {
        font-family: 'Roboto Slab', sans-serif;
        font-size: 16px;
    }

    h1, h2, h3, h4, h5, h6, strong {
        font-weight: 500;
    } 

    button {
        cursor: pointer;
    }
`;
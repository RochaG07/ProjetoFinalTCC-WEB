import React from 'react';

import { Container } from './styles';

interface IConfirmAlert{
    descricao: string;
    yesFunction:  () => void;
    onClose: () => void;
};

const ConfirmAlert: React.FC<IConfirmAlert> = ({ children, descricao,  yesFunction, onClose, ...rest }) => {
    return (

           <Container>
             <h1>Tem certeza?</h1>
             <p>{descricao}</p>
             
             <div id='botoes'>
               
               <button
                   id='botaoSim'
                   onClick={yesFunction}
               >
                   Sim
               </button>
               <button id='botaoNao' onClick={onClose}>Não</button>
             </div>

           </Container>
         );

};

export default ConfirmAlert;
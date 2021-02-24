import React, { useState, useEffect, useCallback } from 'react';

import { Convite } from './styles';
import Modal from '../Modal';

import api from '../../services/api';

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  reduzNumDeConvitesNaoRespondidos: (idTroca: string) => void
  idTroca: string;
}

interface IConvite{
  id: string,
  mensagem: string,
  foiAceito: string,
  dataEnvio: string,
  dataAceitacao: string,
  idUser_solicitador: string,
  nome_solicitador: string,
  idTroca: string
}

interface IResponderConvite{
  idConvite: any,
  respostaAoConvite: 'aceitar' | 'recusar',
}

const ModalConvites: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  idTroca,
  reduzNumDeConvitesNaoRespondidos
}) => {
  const [convites, setConvites] = useState<IConvite[]>([]);

  useEffect(() => {
    async function loadConvites(): Promise<void> {
      api.get<IConvite[]>(`/trocas/convites/${idTroca}`)
      .then(response => {
        setConvites(response.data);
      })  
    }

    loadConvites();
  }, [idTroca]);

  const handleResposta = useCallback(async ({respostaAoConvite, idConvite}: IResponderConvite) => {
    /*
    await api.put('/trocas/convites', {
        respostaAoConvite,
        idConvite
    });
    */
    
    // Remove o convite da lista
    setConvites(convites.filter(convite =>(convite.id !== idConvite)));

    reduzNumDeConvitesNaoRespondidos(idTroca);
  }, [convites, idTroca, reduzNumDeConvitesNaoRespondidos]);

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      {
        convites&&
        convites.map(convite => (
          convite.foiAceito === null &&
          <Convite key={convite.id}> 
          <h1>Convite de {convite.nome_solicitador}</h1>
            <p>{convite.mensagem}</p>
            <button 
            type="button" 
            onClick={() => {handleResposta({idConvite: convite.id, respostaAoConvite: 'aceitar'})}}>
                Aceitar
            </button>
            <button 
            type="button" 
            onClick={() => {handleResposta({idConvite: convite.id, respostaAoConvite: 'recusar'})}}>
                Recusar
            </button>
          </Convite>
        ))
      }
    </Modal>
  );
};

export default ModalConvites;

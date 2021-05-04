import React, { useState, useEffect, useCallback } from 'react';

import { Convite } from './styles';
import Modal from '../Modal';

import api from '../../services/api';
import { socket } from '../../services/socket';

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
    if(respostaAoConvite === "aceitar"){
      api.put('/trocas/convites', {
        respostaAoConvite,
        idConvite
      })
      .then(response => {
          return api.post('/usuarios/notificacoes', {
              conteudo: "Um convite seu foi aceito!",
              idUserAlvo: response.data.idUser_solicitador,
          })
      })
      .then(response => {
          socket.emit('apresentar nova notificacao', {
              id: response.data.id,
              conteudo: response.data.conteudo,
              idUserAlvo: response.data.idUser,
          });
      })
      .catch((err) => {
          console.log(err);
      });

    } else {
      api.put('/trocas/convites', {
        respostaAoConvite,
        idConvite
      })
    }

    //TODO gerar a notificacao por aqui ao inves de ser na rota de criar convite e enviar a
    // notificação recém criada para o socket com seu id 


    
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
            <div id='titulo'>
              <h1>Convite de {convite.nome_solicitador}</h1>
            </div>
            <div id='descricao'>
              <p>{convite.mensagem}</p>
            </div>
            <div id='botoes'>
              <button 
              id="aceitar"
              type="button" 
              onClick={() => {handleResposta({
                idConvite: convite.id, 
                respostaAoConvite: 'aceitar', 
                })}}>
                  Aceitar
              </button>
              <button 
              id="recusar"
              type="button" 
              onClick={() => {handleResposta({
                idConvite: convite.id, 
                respostaAoConvite: 'recusar',
                })}}>
                  Recusar
              </button>
            </div>
          </Convite>
        ))
      }
    </Modal>
  );
};

export default ModalConvites;

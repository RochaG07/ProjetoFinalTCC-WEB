import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route'

import Login from '../pages/Login';
import CriarConta from '../pages/CriarConta';
import TrocasDisponiveis from '../pages/TrocasDisponiveis';
import MinhasTrocas from '../pages/MinhasTrocas';
import NovaTroca from '../pages/NovaTroca';
import MeuPerfil from '../pages/MeuPerfil';
import Negociacoes from '../pages/Negociacoes';

import Premium from '../pages/Premium';

const Routes: React.FC = () => (
    <Switch>
        <Route path="/login" component={Login}/>  
        <Route path="/criar-conta" component={CriarConta}/>  

        <Route path="/trocas-disponiveis" component={TrocasDisponiveis} isPrivate/> 
        <Route path="/minhas-trocas" component={MinhasTrocas} isPrivate/>  
        <Route path="/nova-troca" component={NovaTroca} isPrivate/>  
        <Route path="/meu-perfil" component={MeuPerfil} isPrivate/>  
        <Route path="/negociacoes" component={Negociacoes} isPrivate/>  

        <Route path="/premium" component={Premium} isPrivate/>

    </Switch>
);
//isPrivate -> Rota acessivel somente quando o usuário estiver logado

export default Routes;
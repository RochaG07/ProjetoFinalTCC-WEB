import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import Route from './Route'

import Login from '../pages/Login';
import CriarConta from '../pages/CriarConta';
import TrocasDisponiveis from '../pages/TrocasDisponiveis';
import MinhasTrocas from '../pages/MinhasTrocas';
import NovaTroca from '../pages/NovaTroca';
import MeuPerfil from '../pages/MeuPerfil';
import Negociacoes from '../pages/Negociacoes';
import ResetSenha from '../pages/ResetSenha';
import EsqueciSenha from '../pages/EsqueciSenha';

import Premium from '../pages/Premium';

import MenuAdministrador from '../pages/MenuAdministrador';

const Routes: React.FC = () => (
    <Switch>
        <Route exact path="/" component={() => ( <Redirect to="/login" />)}/>  
            
        <Route path="/login" component={Login}/>  
        <Route path="/criar-conta" component={CriarConta}/> 
        <Route path="/esqueci-minha-senha" component={EsqueciSenha}/>  
        <Route path="/resetar-senha" component={ResetSenha}/>  


        <Route path="/trocas-disponiveis" component={TrocasDisponiveis} isPrivate/> 
        <Route path="/minhas-trocas" component={MinhasTrocas} isPrivate/>  
        <Route path="/nova-troca" component={NovaTroca} isPrivate/>  
        <Route path="/meu-perfil" component={MeuPerfil} isPrivate/>  
        <Route path="/negociacoes" component={Negociacoes} isPrivate/>  
        <Route path="/admin" component={MenuAdministrador} isPrivate/>  
        <Route path="/premium" component={Premium} isPrivate/>

    </Switch>
);
//isPrivate -> Rota acessivel somente quando o usuário estiver logado

export default Routes;
## Indice

- [Sobre](#-sobre)
- [Tecnologias utilizadas](#-tecnologias-utilizadas)
- [Páginas](#-páginas)
- [Como baixar o projeto](#-como-baixar-o-projeto)

---

## Sobre

Este projeto tem como objetivo prover um ambiente em que dois usuários possam se comunicar com a finalidade de trocar cópias físicas de jogos. 

O usuário ao criar sua conta começa com 3 de 3 trocas disponíveis, cada vez que o usuário cria uma nova troca e não é assinante do serviço premium é consumido 1 e é iniciado um contador de uma semana para adicionar mais 1 ao total. A troca após ser criada fica visível para outros usuários que por sua vez podem enviar convites solicitando uma negociação.

Quando o usuário criador da troca aceitar um convite enviado por outro usuário é criada uma negociação que envolvendo os dois. Uma negociação é a parte final do processo de troca, na qual é fornecido um chat em tempo real na qual os integrantes da mesma poderão discutir e chegar em um acordo para a realização da troca ou desistir e desfazer a negociação.

O projeto foi desenvolvido para o projeto final da Faculdades Integradas Simonsen. Essa parte é referente ao frontend do projeto, para o backend clique [aqui](https://github.com/RochaG07/ProjetoFinalTCC-API).

---

## Tecnologias utilizadas

O frontend do projeto foi desenvolvido utilizando as seguintes tecnologias:

- React.js
- Typescript
- JSON Web Token
- Stripe
- Socket.io
- Axios
- Styled components
- Unform
- Material UI

---

## Páginas
#### Login

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaLogin.png'>

Login na aplicação.

#### Criar conta

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaCadastro.png'>

Criação de uma nova conta com base nos dados fornecidos.

#### Esqueci minha senha

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaEsqueciSenha.png'>

O usuário deve colocar seu email e dar submit, caso o endereço de email tenha sido cadastrado é enviado um novo email contendo o link para a recuperação da conta.

#### Reset de senha

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaResetSenha.png'>

Página apenas acessível através de um link por email gerado pelo esqueci minha senha, contém em sua URL o token necessário para validar a troca da senha e é pedido uma nova senha e sua confirmação para a atualização da senha.

#### Trocas disponíveis

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaTrocasDisponiveis.png'>

É primeira página que o usuário se depara ao fazer login, dentro dela ele poderá visualizar todas as trocas criadas por outros usuários e ao clicar no card de uma troca poderá ver mais detalhes sobre a mesma e até enviar um convite que será enviado para o criador da troca.

#### Negociações em andamento

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaNegociacoesEmAndamento.png'>

Exibe as negociações ativas que o usuário logado participa. Ao clicar no card de uma negociação abrirá o chat da selecionada. 

#### Nova troca

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaNovaTroca.png'>

Página que o usuário poderá criar uma nova troca com o custo de uma troca disponível caso o mesmo não tenha o premium ativo.

#### Minhas trocas

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaMinhasTrocas.png'>

Exibe as trocas ativas do usuário logado, cada troca possui um card com os ícones de uma inbox e um x, o ícone x serve para a desativação da troca que ao ser clicada pedirá que o usuário confirme que deseja excluir a troca, já o ícone de inbox 
exibir os convites que essa troca recebeu, cada convite recebido possuirá uma descrição juntamente com a opcão de aceitar ou recusar, caso o usuário aceite será criada uma nova negociação.

#### Meu perfil

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaMeuPerfil.png'>

Exibe os dados do usuário logado, onde o mesmo poderá realizar alterações livremente, com exceção na troca de senha, na qual o usuário deve inserir sua antiga senha juntamente com a nova senha duas vezes.

#### Premium

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaPremium.png'>

Página que o usuário poderá realizar a assinatura do serviço premium, caso o usuário não tenha iniciado a assinatura é exibida um botão que ao ser clicado abre um modal que contém um campo para que seja inserido os dados necessários para a assinatura. Caso esteja com a assinatura ativa são exibidos duas opções a primeira sendo a de trocar o cartão utilizado na cobrança automática e a segunda é o cancelamento da assinatura, essa última exigindo confirmação. Caso o usuário tenha cancelado sua assinatura será exibida uma opção para que o mesmo possa reativa-lá seguindo os mesmos passos para a criação da assinatura.

#### Administrador

<img src='https://raw.githubusercontent.com/RochaG07/ProjetoFinalTCC-WEB/master/media/TelaAdmin.png'>

Essa página só será exibida caso o usuário possua o status de administrador. Nela contém um menu com todas as ações realizadas por administradores desde que o usuário tenha a devida permissão, elas são:

- **Cadastrar jogos:** Cadastra um novo jogo.
- **Deletar jogos:** Deleta um jogo existente.
- **Cadastrar consoles:** Cadastra um novo console. 
- **Deletar consoles:** Deleta um console existente.
- **Enviar avisos:** Envia um aviso para um usuário.
- **Adicionar permissões:** Adiciona uma ou mais permissões a um admin.
- **Atribuir status de admin:** Adiciona o status de admin para um usuário comum.
- **Desativar status de admin:** Remove o status de admin de um usuário.

---

## Como baixar o projeto

```jsx
#Clonar o repositório
$ git clone https://github.com/RochaG07/ProjetoFinalTCC-WEB.git

#Instalar as dependências
$ yarn add

#Iniciar o servidor web
$ yarn start
```
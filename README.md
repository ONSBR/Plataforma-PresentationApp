# Plataforma-PresentationApp

#### Introdução
A Plataforma-PresentationApp representa a camada de apresentação de um sistema sendo executado na plataforma.
Foi criado esse projeto para simular uma camada de apresentação de um sistema qualquer, que envia o evento de comando de solicitações 
de execução de negócio pela apresentação.

Neste caso, estamos simulando a funcionalidades de , cadastro de cliente, criação de conta e transferência de saldo entre contas.

#### Estrutura do Projeto

O projeto é dividido em 2 módulos:
* [crud-contas]: contém os componentes, html templates de apresentação em Angular 5, e o conteúdo estático (js, css e imagens).
* [server]: contém o server da apresentação, para receber as requisições da camada de apresentação, 
  de envio e recebimento de eventos para a plataforma.

No ´crud-contas´ temos as telas angular de cadastro de client, registro da conta e operação de transferência.


#### Requisitos

Para executar as aplicações com sucesso você precisa instalar as seguintes ferramentas:
* [NodeJS](https://nodejs.org)
* NPM (vem junto com o NodeJS)
* [Docker](https://www.docker.com/)
* Docker compose

Caso você opte por usar o docker você pode subir com o seguinte comando:
```sh
$ docker-compose up -d
```
Ao executar esse comando o docker irá subir um container com servidor da apresentação.


# Para executar o servidor angular independente do docker 

Use os comandos:
cd crud-contas/ 
npm install 
ng serve -o 

OBS: o parâmetro ´-o´ faz com que o browser seja aberto ao iniciar o servidor angular

### Para instalar ou atualizar as dependências é necessário executar o comando:
npm install


Caso queira executar o servidor da apresentação sem utilizar o docker, tem um script no projeto Plataforma-SDK, em:
Plataforma-SDK/_scripts/shell/start-PresentationApp.sh

# Acessando as telas

Após a subida dos containers você pode enviar deve acessar o eventmamanger pelo endereço:
http://localhost:4200/
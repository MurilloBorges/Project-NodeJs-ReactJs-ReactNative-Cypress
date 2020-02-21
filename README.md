# -SQUADS-Prova-Backend-
[SQUADS] Prova Backend

- Gerenciador de pacotes utilizado Chocolatey;
para instalar executar o seguinte comando no power shell com permissão de adiministrador
Set-ExecutionPolicy Bypass -Scope Process -Force; [System.Net.ServicePointManager]::SecurityProtocol = [System.Net.ServicePointManager]::SecurityProtocol -bor 3072; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))

- Versão do node utilizada 10.16.1;
para instalar executar o seguinte comando no cmd com permissão de adiministrador
cinst nodejs.install --version 10.16.1

- Gerenciador de pacotes também utilizado Yarn;
para instalar executar o seguinte comando no cmd com permisão de adiministrador
choco install yarn


//script criado para startar o servidor, toda vez que o código é salvo o servidor é startado novamente;
"scripts": {
	"dev": "nodemon src/server.js"
},


Conexão com o banco de dados
User: squads
Password: squads
url: mongodb+srv://squads:<password>@cluster0-w8s7a.mongodb.net/test?retryWrites=true&w=majority
autentication database: admin
url conect mongoDB compass: mongodb+srv://squads:<password>@cluster0-w8s7a.mongodb.net/test


Repositório de instalação C:\Repositório\FontesNodeJs\-SQUADS-Prova-Backend-\squads\backend
Dependências instaladas
//Dependência de server
yarn add express
//Dependência de desenvolvimento
yarn add nodemon -D
//Dependência de banco de dados MongoDB
yarn add mongoose
//Dependência de logging
yarn add winston
//Dependência de path dos arquivos no fonte para montagem do logging
yarn add path
//Dependência de diretório
yarn add fs
//Dependência de geração de log das requisições
yarn add morgan
//Dependência de autenticação jsonwebtoken: implementa o protocolo JSON Web Token e dotenv: gerencia facilmente variáveis de ambiente;
yarn add jsonwebtoken dotenv
//Dependência de utilidades do node
yarn add util
//Dependência cors
yarn add cors


Para subir o server:
yard dev
url das resquisições:
Secret de geração do token teste@squads16202002, criptografado em hash md5
--Gerar o token no endpoint de login, esse token é valido por 1 dia, ele serve para utilizar os outros endpoints.

Post: http://localhost:8080/login	
	-definir no header o conten-type: application/json
	-no body selecionar tipo de envio raw
	-json de envio:
	{
		"username": "squads",
		"password": "squads"
	}
	-json de resposta:
	{
		"auth": true,
		"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTgxODkwNTQ2LCJleHAiOjE1ODE4OTA1NDZ9.Tbp26hvFnldxn798ANYrbONE-xlY8DnFrlGzvP6L-no"
	}	
	
Post: http://localhost:8080/produtos
	-definir no Authorization definir o type de authorization como 'Bearer Type' e no 'Token' colar o token gerado no endpoint de login
	-definir no header o conten-type: application/json
	-no body selecionar tipo de envio raw
	-json de envio:
	{
		"nome":"Produto teste",
		"descricao":"produto teste 1",
		"valor": 50.00
	}
	-json de resposta:
	{
		"_id": "5e4698640319a04908b6ec6f",
		"nome": "Produto teste",
		"descricao": "produto teste 1",
		"valor": 50,
		"createdAt": "2020-02-14T12:53:56.129Z",
		"updatedAt": "2020-02-14T12:53:56.129Z",
		"__v": 0
	}

Get: http://localhost:8080/produtos ou http://localhost:8080/produtos?nome=Produto teste
	-definir no Authorization definir o type de authorization como 'Bearer Type' e no 'Token' colar o token gerado no endpoint de login
	-retorna todoss os produtos, ou um unico produto com base na key (nome) e value (Produto teste) informados no Query Params

Get: http://localhost:8080/produtos/5e4698640319a04908b6ec6f
	-definir no Authorization definir o type de authorization como 'Bearer Type' e no 'Token' colar o token gerado no endpoint de login
	-retorna o produto especifico filtrado pelo id
	
Delete: http://localhost:8080/produtos/5e4698640319a04908b6ec6f
	-definir no Authorization definir o type de authorization como 'Bearer Type' e no 'Token' colar o token gerado no endpoint de login
	-retorna o json com o produto removido da base
	
Patch: http://localhost:8080/produtos/5e4698640319a04908b6ec6f
	-definir no Authorization definir o type de authorization como 'Bearer Type' e no 'Token' colar o token gerado no endpoint de login
	-definir no header o conten-type: application/json
	-no body selecionar tipo de envio raw
	-json de envio com as informações que deseja alteração:
	{
		"valor": 102.50
	}
	-json de resposta:
	{
		"_id": "5e4698640319a04908b6ec6f",
		"nome": "Produto teste",
		"descricao": "produto teste 1",
		"valor": 102.5,
		"createdAt": "2020-02-14T12:53:56.129Z",
		"updatedAt": "2020-02-14T14:14:49.507Z",
		"__v": 0
	}
	


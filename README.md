# API LegisConnect
API para la gestion de datos de la aplicacion LegisConnect

## Instrucciones de como esta estructurado la informacion de los endpoints:

`endpoint y tipo de peticion`
- Campos que requiere (nombre, edad, titulo)

## 📌 Endpoints Usuarios

`POST - /users/auth` Inicio de session de usuarios
- email
- password

`POST - /users/createUser` Creacion de usuarios
- name
- email
- password
- repetir_password

`GET - /users/authSession` Autenticacion se session de usuarios

## 📌 Endopoints Propuestas

`GET - /proposals/getProposals` Trae todas las propuestas

`GET - /proposals/getProposals/:id` Trae todas las propuestas de un unico usuario

`POST - /proposals/createProposal` Crea una propuesta nuevo (Por defecto se crea con status: **BORRADOR**)
- title
- content

## 📌 Endopoint para servidor

`GET - /serverAlive` Valida que el servidor este en linea y manda en que puerto se ejecuta
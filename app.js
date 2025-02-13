/**********************************************************************
 * Objetivo: Criar uma API para o projeto Whatsapp, planejando e criando todos os EndPoints necessários para fornecer dados a equipe Front-End.
 * Autor: Gabriel Souza Costa
 * Data: 06/02/2024
 * Versão: 1.0
 **********************************************************************/

const express       = require('express')
const cors          = require('cors')
const bodyParser    = require('body-parser')

const app = express()

app.use((request, response, next)=>{
    response.header('Access-Control-Allow-Origin', '*')

    response.header('Access-Control-Allow-Methods', 'GET')
    
    app.use(cors())
    next()
})

const whatsapp = require('./MODULO/funcoes')

//EndPoint que lista todos os dados pessoais por usuário (FUNÇÃO 1)
app.get('/v1/whatsapp/listaDadosPessoais', cors(), async function (request, response){
    let Dados = request.query.number

    let dados = whatsapp.listaDadosPessoais(Dados)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Número de telefone não encontrado'})
    }
})
//URL: http://localhost:8080/v1/whatsapp/listaDadosPessoais?number=11987876567

//EndPoint que lista os dados da conta do profile do usuário (FUNÇÃO 2)
app.get('/v1/whatsapp/dadosConta', cors(), async function (request, response){
    let Dados = request.query.number

    let dados = whatsapp.listaDadosEditados(Dados)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Número de telefone não encontrado'})
    }
})
//URL: http://localhost:8080/v1/whatsapp/dadosConta?number=11987876567


// EndPoint que lista os dados de contato para cada usuário (FUNÇÃO 3)
app.get('/v1/whatsapp/contatoUsuario', cors(), async function (request, response){
    let Dados = request.query.number

    let dados = whatsapp.listaContatoUsuario(Dados)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Número de telefone não encontrado'})
    }
})
//URL: http://localhost:8080/v1/whatsapp/contatoUsuario?number=11987876567

// EndPoint que lista as conversas de cada usuário (FUNÇÃO 4)
app.get('/v1/whatsapp/conversasUsuario', cors(), async function (request, response){
    let Dados = request.query.number

    let dados = whatsapp.filtroContatosConversas(Dados)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'Número de telefone não encontrado'})
    }
})
//URL: http://localhost:8080/v1/whatsapp/conversasUsuario?number=11987876567

//EndPoint que filtra o usuário e nome do seu contato, e lista as conversas relacionadas a eles (FUNÇÃO 5)
app.get('/v1/whatsapp/usuarioNomeContato', cors (), async function(request, response){

    let Dados = request.query.number
    let nome = request.query.name

    let dados = whatsapp.usuarioContato(Dados, nome)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'A matrícula do aluno não foi encontrada'})
    }
})
//URL: http://localhost:8080/v1/whatsapp/usuarioNomeContato?number=11987876567&name=Ana Maria

//EndPoint que filtra a pesquisa de palavra chave com base nas conversas do usuário e no respectivo contato (FUNÇÃO 6)
app.get('/v1/whatsapp/palavraChaveConversas', cors (), async function(request, response){

    let Dados = request.query.number
    let nome = request.query.name
    let palavraChave = request.query.palavraChave

    let dados = whatsapp.usuarioContato(Dados, nome, palavraChave)

    if(dados){
        response.status(200)
        response.json(dados)
    }else{
        response.status(404)
        response.json({'status': 404, 'message': 'A matrícula do aluno não foi encontrada'})
    }
})

app.listen(8080, function (){
    console.log('API aguardando requisições ...')
})
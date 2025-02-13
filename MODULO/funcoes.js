/**********************************************************************
 * Objetivo: criar uma API com Back-End node.JS para o projeto do Whatsapp que a equipe de Front-End já disponibilizou e está funcionando com dados provisórios.
 * Autor: Gabriel Souza Costa
 * Data: 30/01/2025
 * Versão: 1.0
 **********************************************************************/

var contatos = require('./contatos')
var contatosPessoas = contatos.contatos['whats-users']

/******************** FUNÇÃO 01 ********************/
const listaDadosPessoais = function (numero) {
    let numberUser  = numero
    let retornoDoObjeto = {number: numberUser , id: "", account:"", dateStart: "", dateEnd: ""}

    contatosPessoas.forEach(function(user){
        if(user.number == numberUser ){
            retornoDoObjeto.id = user.id
            retornoDoObjeto.account = user.account
            retornoDoObjeto.dateStart = user['created-since'].start
            retornoDoObjeto.dateEnd = user['created-since'].end
        }
    })

    if (retornoDoObjeto.id === "") {
        return false
    } else {
        return retornoDoObjeto
    }
}

/******************** FUNÇÃO 02 ********************/
const listaDadosEditados = function (numero) {
    let numberUser   = numero
    let status = false
    let retornoDoObjeto = {nickname: "", profileImage:"", background:""}

    contatosPessoas.forEach(function(user){
        if (user.number == numberUser ){
            retornoDoObjeto.nickname = user.nickname
            retornoDoObjeto.profileImage = user ['profile-image']
            retornoDoObjeto.background = user.background
            status = true
        }
    })
    return status ? retornoDoObjeto : false
}

/******************** FUNÇÃO 03 ********************/
const listaContatoUsuario = function (numero) {
    let numberUser    = numero
    let retornoDoObjeto = {number: numberUser , contacts: []}

    contatosPessoas.forEach(function(usuario){
        if(usuario.number == numberUser  ){
            usuario.contacts.forEach(function(contato){
                let objetoDeRetorno = {name: contato.name, description: contato.description, image: contato.image}
                retornoDoObjeto.contacts.push(objetoDeRetorno)
            })
        }
    })

    if (retornoDoObjeto.contacts.length === 0) {
        return false;
    } else {
        return retornoDoObjeto
    }
}

/******************** FUNÇÃO 04 ********************/
const filtroContatosConversas = function (numero) {
    let numberUser  = numero
    let retornoDoObjeto = {number: numberUser , contacts: []}

    contatosPessoas.forEach(function(usuario){
        if(usuario.number == numberUser  ){
            retornoDoObjeto.contacts = usuario.contacts
        }
    })

    if (retornoDoObjeto.contacts.length === 0) {
        return false
    } else {
        return retornoDoObjeto
    }
}

/******************** FUNÇÃO 05 ********************/
const usuarioContato = function(numero, nome) {
    let numberUser   = numero
    let contactName = nome
    let retornoDoObjeto = {number: numberUser  , messages: []}

    contatosPessoas.forEach(function(usuario){
        if(usuario.number == numberUser   ){
            usuario.contacts.forEach(function(contato){
                if(contato.name === contactName ){
                    retornoDoObjeto.messages = contato.messages
                }
            })
        }
    })

    if (retornoDoObjeto.messages.length === 0) {
        return false
    } else {
        return retornoDoObjeto
    }
}

/******************** FUNÇÃO 06 ********************/
const pesquisaPalavraChave = function(numero, nome, palavraChave){
    let numberUser  = numero
    let contactName = nome
    let palavra = palavraChave.toLowerCase()
    let retornoDoObjeto = {number: numberUser , contact: contactName, messages: []}
    let status = false

    contatosPessoas.forEach(function(usuario){
        if(usuario.number == numberUser ){
            usuario.contacts.forEach(function(contato){
                if (contato.name === contactName ){
                    contato.messages.forEach(function(mensagem){
                        if(mensagem.content.toLowerCase().includes(palavra)){
                            status = true
                            retornoDoObjeto.messages.push(mensagem) // Corrigido aqui
                        }
                    })
                }
            })
        }
    })
    return status ? retornoDoObjeto : false
}

//console.log(listaDadosPessoais('11987876567'))
//console.log(listaDadosEditados('11966578996'))
//console.log(listaContatoUsuario('11987876567'))
//console.log(filtroContatosConversas('11987876567'))
//console.log(usuarioContato('11987876567', 'Ana Maria'))
//console.log(pesquisaPalavraChave('11987876567', 'Ana Maria', 'you'))

module.exports = {
    listaDadosPessoais,
    listaDadosEditados,
    listaContatoUsuario,
    filtroContatosConversas,
    usuarioContato,
    pesquisaPalavraChave
}


import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'
import { Session } from 'meteor/session'
import { Mensagens } from '../../imports/mensagens.js'


Template.chat.onRendered(function() {

  Session.set('usuarioEscolhido', {})

})


Template.chat.events({
  'click #sair': function(event, template) {

    Meteor.logout(function(erro) {
      if(erro){
        alert(erro.reason)
      }else{
        Router.go('/')
      }
    })
  },
  'click #usuarioLista': function(event, template) {
    Session.set('usuarioEscolhido', {
      nome: this.profile.nome,
      id: this._id
    })

  },
  'click #enviarMensagem': function(event, template) {

    var mensagem = $('#mensagem').val()

    if(mensagem){

      var dataObject = {
        mensagem: mensagem,
        usuario: Session.get('usuarioEscolhido').id
      }

      Meteor.call("enviar.mensagem", dataObject, function(error, result){
        if(error){
          console.log("error", error);
        }
        if(result){
          $('#mensagem').val(null)
        }

      })
    }
  }
})

Template.chat.helpers({
  usuarios(){
    return Meteor.users.find({_id:{$ne:Meteor.userId()}})
  },
  usuarioEscolhido(){
    return Session.get('usuarioEscolhido')
  },
  mensagens(){
    var buscaMensagens = Mensagens.findOne({ usuarios: { $elemMatch: { $eq:Meteor.userId(), $eq: Session.get('usuarioEscolhido').id  } } })
    if(buscaMensagens){
      var mensagens = buscaMensagens.mensagens.map(function(index) {

        return {
          mensagem: index.mensagem,
          alert: function() {
            if(index.usuario == Meteor.userId()){
              return 'success'
            }else{
              return 'info'
            }
          },
          pull: function() {
            if(index.usuario == Meteor.userId()){
              return 'right'
            }else{
              return 'left'
            }
          }
        }

      })

      return mensagens
    }else{
      return false
    }


  }
})

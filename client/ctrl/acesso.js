import { Template } from 'meteor/templating'
import { Meteor } from 'meteor/meteor'

Template.acesso.events({
  "submit #acesso": function(event, template) {

    event.preventDefault()

    var usuario = $('#usuario').val()
    var senha = $('#senha').val()

    Meteor.loginWithPassword(usuario, senha, function(erro) {

      if(erro){
        toastr.error(erro.reason)
      }else{
        Router.go('/')
      }

    })


  }
})

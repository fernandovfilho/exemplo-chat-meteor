import { Accounts } from 'meteor/accounts-base'
import { Template } from 'meteor/templating'


Template.cadastro.events({
  'submit #cadastro': function(event, template) {

    event.preventDefault()

    var usuario = $('#usuario').val()
    var nome = $('#nome').val()
    var senha = $('#senha').val()


    Accounts.createUser({username:usuario, password: senha, profile: {nome:nome}}, function(erro) {

      if(erro){
        toastr.error(erro.reason)
      }else{
        toastr.success('Usuário criado com sucesso')
        Router.go('/acesso')
      }

    })

  }
})

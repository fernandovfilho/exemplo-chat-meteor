Router.route('/', function () {
  this.wait(Meteor.subscribe("publicacaoUsuarios"), Meteor.subscribe("publicacaoMensagens"))
  this.layout('principal')
  var currentUser = Meteor.userId()
  if (this.ready()) {
    if(currentUser){
      this.render('chat', {to: 'conteudo'})
    } else {
      this.render('acesso', {to: 'conteudo'})
    }
  }else{
    this.render('carregando', {to: 'conteudo'})
  }
})

Router.route('/cadastro', function () {
  this.layout('principal')
  this.render('cadastro', {to: 'conteudo'})
})


Router.route('/acesso', function () {
  this.layout('principal')
  this.render('acesso', {to: 'conteudo'})
})

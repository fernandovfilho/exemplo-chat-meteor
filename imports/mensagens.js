import { Meteor } from 'meteor/meteor'
import { Mongo } from 'meteor/mongo'
import { check } from 'meteor/check'

export const Mensagens = new Mongo.Collection('mensagens')

if(Meteor.isServer){

  Meteor.publish("publicacaoMensagens", function(){

    return Mensagens.find({ usuarios: { $in: [this.userId] } })

  })

  Meteor.methods({
    'enviar.mensagem':function(dataObject){


      var padrao = {
        mensagem: String,
        usuario: String
      }

      var id

      check(dataObject, padrao)


      var idMsg = Mensagens.findOne({
        $and: [
          {'usuarios': {'$elemMatch': {$eq:Meteor.userId()} } },
          {'usuarios': {'$elemMatch': {$eq: dataObject.usuario} } }
        ]
      })

      if(idMsg){

        id = idMsg._id

        Mensagens.update({_id:id},
          { $addToSet: {mensagens: {
            mensagem: dataObject.mensagem,
            data: moment().valueOf(),
            usuario: Meteor.userId()
          } } }
        )

      }else{

        id = Mensagens.insert({
          usuarios: [Meteor.userId(), dataObject.usuario],
          mensagens: [{
            mensagem: dataObject.mensagem,
            data: moment().valueOf(),
            usuario: Meteor.userId()
          }]
        })


      }

      return id

    }
  })

}

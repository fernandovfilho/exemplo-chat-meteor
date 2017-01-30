import { Meteor } from 'meteor/meteor'

if(Meteor.isServer){

  Meteor.publish("publicacaoUsuarios", function(){

    return Meteor.users.find()

  })


}

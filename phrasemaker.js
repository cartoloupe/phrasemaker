if (Meteor.isClient) {

  Template.signup.helpers({
    signedUp: function () {
      return Session.get('player_id')
    },
  })
  Template.game.helpers({
    texts: function () {
      return Texts.findOne().val;
    },
    currentPlayer: function(){
      playerWhoseTurn = Gamestate.findOne().nextPlayer
      if (Session.get('player_id') == playerWhoseTurn) {
        return true
      }else {
        return false
      }
    }
  });

  Template.signup.events({
    'click button': function () {
      name = $('#name').val();
      player = Players.insert({name: name});
      console.log(player)
      Session.set('player_id', player)

      if (Gamestate.findOne().nextPlayer == null) {
        Gamestate.update(1, {nextPlayer: player})
      }
    }
  });

  Template.game.events({
    'input #A': function () {
      console.log("inputted");
      input = $('input#A')[0];
      addval = input.value;
      input.value = "";
      text = Texts.findOne()
      Texts.upsert(text._id, {$set: {val: (text.val + addval)}});
      Meteor.call('switchPlayer', Session.get('player_id'));
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}

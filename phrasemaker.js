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
      current_player_id = Session.get('player_id')
      if ( (current_player_id != undefined) && (current_player_id== playerWhoseTurn) ) {
        setTimeout(function(){
          console.log('timed out')
          if (Session.get('player_id') == playerWhoseTurn) {
          Meteor.call('switchPlayer', Session.get('player_id'));
          }
        }, 3000)
        setInterval(function(){
          $('input#A').focus();
        }, 300)
        return true
      } else {
        return false
      }
    }
  });

  Template.signup.events({
    'click button': function () {
      name = $('#name').val();
      player = Players.insert({name: name, created_at: Date.now() });
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
      Texts.upsert(1, {$set: {val: (text.val + addval)}});
      $('input#A').toggleClass('your-turn')
      Meteor.call('switchPlayer', Session.get('player_id'));
    }

  });

  Template.controls.events({
    'click button': function(){
      console.log("reset was pressed")
      Meteor.call('reset');
      window.location.reload()
    }

  })

  Template.game.rendered = function(){
    console.log('rendered called')
  };
}

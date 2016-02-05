  Template.game.rendered = function(){
    console.log('rendered called')
  };
  Template.game.helpers({
    gameOver: function () {
      Session.set('gameOver', Gamestate.findOne().gameOver);
      return Session.get('gameOver')
    },
    timeLeft: function () {
      Session.set('timeLeft', Gamestate.findOne().timer);
      return Session.get('timeLeft')
    },
    texts: function () {
      id = Session.get('group_id')
      return Texts.findOne(id).val;
    },
    other_texts: function () {
      id = Session.get('group_id')
      other_group_id = 0
      if (id == 1){
        other_group_id = 2
      }else{
        other_group_id = 1
      }
      return Texts.findOne(other_group_id).val;
    },
    currentPlayer: function(){
      playerWhoseTurn = Turnstate.findOne(group_id).nextPlayer
      current_player_id = Session.get('player_id')
      if ( (current_player_id != undefined) && (current_player_id== playerWhoseTurn) ) {
        setTimeout(function(){
          console.log('timed out')
          if (Session.get('player_id') == playerWhoseTurn) {
          Meteor.call('switchPlayer', Session.get('player_id'), Session.get('group_id'));
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


  Template.game.events({
    'input #A': function () {
      input = $('input#A')[0];
      addval = input.value;
      input.value = "";
      
      console.log(Session.get('group_id'))
      text = Texts.findOne(Session.get('group_id'))
      Texts.upsert(text._id, {$set: {val: (text.val + addval)}});
      $('input#A').toggleClass('your-turn')
      Meteor.call('switchPlayer', Session.get('player_id'), Session.get('group_id'));
    }

  });



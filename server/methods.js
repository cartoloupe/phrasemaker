Meteor.methods({
  switchPlayer: function(player_id, g_id){
    players = Players.find({group_id: g_id}, {sort: {created_at: -1}}).fetch()

    index = players.findIndex(function(n){
      return n._id == player_id
    })

    nPlayers = players.length
    nextPlayer = players[(index + 1) % nPlayers]
    Turnstate.upsert(g_id, {$set: {nextPlayer: nextPlayer._id}})

  },
  reset: function(){
    Players.remove({});
    Gamestate.update(1, {$set: {reset: true, gamePhase: 'signup', timer: 5} });
    Turnstate.upsert(1, {nextPlayer: null})
    Turnstate.upsert(2, {nextPlayer: null})
    Texts.update(1, {val: ""})
    //Meteor.clearInterval(interval)
  },
  resetPhrase: function(){
    Texts.update(1, {val: ""})
    Gamestate.update(1, {$set: { gamePhase: 'running'}});
    Meteor.call('startGame')
    //Meteor.beginInterval(interval)
  },
  startGame: function(){
    setTimeout(
      Meteor.bindEnvironment(function () {
        Gamestate.update(1, {$set: { gamePhase: 'running', timer: 5}})
      }), 5000)

  },
});

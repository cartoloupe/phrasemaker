Meteor.methods({
  gameLength: function(){return GAMELENGTH;},
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
    Gamestate.update(1, {$set: {reset: true, gamePhase: 'signup', timer: GAMELENGTH} });
    Turnstate.upsert(1, {nextPlayer: null})
    Turnstate.upsert(2, {nextPlayer: null})
    Texts.update(1, {val: ""})
    Texts.update(2, {val: ""})
    //Meteor.clearInterval(interval)
  },
  resetPhrase: function(){
    Texts.update(1, {val: ""})
    Texts.update(2, {val: ""})
    Gamestate.update(1, {$set: { gamePhase: 'signup', timer: GAMELENGTH}});
    Meteor.call('startGame')
    //Meteor.beginInterval(interval)
  },
  startGame: function(){
    Gamestate.update(1, {$set: { gamePhase: 'running'}})
  },
});

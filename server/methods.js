Meteor.methods({
  switchPlayer: function(player_id){
    players = Players.find({}, {sort: {created_at: -1}}).fetch()

    index = players.findIndex(function(n){
      console.log(n)
      console.log(n._id)
      return n._id == player_id
    })

    nPlayers = players.length
    nextPlayer = players[(index + 1) % nPlayers]
    Gamestate.upsert(1, {nextPlayer: nextPlayer._id})

  },
  reset: function(){
      Players.remove({});
      Gamestate.update(1, {nextPlayer: null, reset: true});
      Texts.update(1, {val: ""})
  }
});

Meteor.methods({
  switchPlayer: function(player_id){
    players = Players.find({}).fetch();

    index = players.findIndex(function(n){
      console.log(n)
      console.log(n._id)
      return n._id == player_id
    })

    nPlayers = players.length
    nextPlayer = players[(index + 1) % nPlayers]
    Gamestate.upsert(1, {nextPlayer: nextPlayer._id})

  }
});

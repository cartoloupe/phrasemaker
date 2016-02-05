chooseGroup = function(players){
  if (players.length == 0) {
    return 1
  }else{
    groups = _.groupBy(players, function(p){return p.group_id})
    if (groups['1'].length > groups['2'].length) {
      return 2
    }else{
      return 1
    }
  }
}

createPlayer = function(name, group_id){
  player = Players.insert({name: name, created_at: Date.now(), group_id: group_id });
  Session.set('player_id', player)
  Session.set('group_id', group_id)

  return player
}

setFirstPlayerPerGroup = function (player, group_id) {
  if (Turnstate.findOne(group_id).nextPlayer == null) {
    Turnstate.update(group_id, {$set: {nextPlayer: player} })
  }
}

Template.signup.helpers({
  signedUp: function () {
    return Session.get('player_id')
  },
})

Template.signup.events({
  'click button': function () {
    name = $('#name').val();

    group_id = chooseGroup(Players.find({}).fetch())

    player = createPlayer(name, group_id)

    setFirstPlayerPerGroup(player, group_id)
  }
});


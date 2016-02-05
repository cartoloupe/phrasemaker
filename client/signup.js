  Template.signup.helpers({
    signedUp: function () {
      return Session.get('player_id')
    },
  })

  Template.signup.events({
    'click button': function () {
      name = $('#name').val();

      group_id = 1
      console.log(Players.find({}).count() )
      if (Players.find({}).count() == 0) {
        group_id = 1
      }else{
        nGroup1 = Players.find({group_id: 1}).count()
        nGroup2 = Players.find({group_id: 2}).count()
        if (nGroup1 > nGroup2) {
          group_id = 2
        }else{
          group_id = 1
        }
      }

      player = Players.insert({name: name, created_at: Date.now(), group_id: group_id });
      Session.set('player_id', player)
      Session.set('group_id', group_id)

      if (Turnstate.findOne(group_id).nextPlayer == null) {
        Turnstate.update(group_id, {$set: {nextPlayer: player} })
        Meteor.call('startGame')
      }

    }
  });



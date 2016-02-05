  Template.controls.events({
    'click button.reset-game': function(){
      console.log("reset was pressed")
      Meteor.call('reset');
      window.location.reload()
    },
    'click button.reset-phrase': function(){
      console.log("reset-phrase was pressed")
      Meteor.call('resetPhrase');
    }

  })


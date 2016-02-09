Meteor.startup(function () {
  Texts.upsert(1, {val: ""})
  Texts.upsert(2, {val: ""})
  Gamestate.upsert(1, {reset: false, gamePhase: 'signup', timer: 60})
  Turnstate.upsert(1, {nextPlayer: null})
  Turnstate.upsert(2, {nextPlayer: null})




  // game loop

  interval = setInterval(
    Meteor.bindEnvironment(function () {

        gamestate = Gamestate.findOne()
        if (gamestate.gamePhase != 'running'){
          // don't count down
        }else{
          time = Gamestate.findOne().timer
          time = time - 1
          if (time < 0){
            time = 0
            Gamestate.update(1, {$set: {gamePhase: 'gameOver'}})
          }
          Gamestate.update(1, {$set: { timer: time}})
        }

  }), 1000)




});






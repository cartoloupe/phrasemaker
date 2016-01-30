Meteor.startup(function () {
  Texts.upsert(1, {val: ""})
  Gamestate.upsert(1, {nextPlayer: null})
});


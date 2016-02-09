Template.registerHelper( 'gamePhase', () => {
    gamePhase = Gamestate.findOne().gamePhase
    Session.set('gamePhase', gamePhase);
    return Session.get('gamePhase')
});
Template.registerHelper( 'sessionData', () => {
    return JSON.stringify(Session.all())
});
Template.registerHelper( 'turnstates', () => {
    return JSON.stringify(Turnstate.find({}).fetch())
});
Template.registerHelper( 'gamestates', () => {
    return JSON.stringify(Gamestate.find({}).fetch())
});
Template.registerHelper( 'playersInDB', () => {
    return JSON.stringify(Players.find({}).fetch())
});

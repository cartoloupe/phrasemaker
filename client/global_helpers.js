Template.registerHelper( 'gamePhase', () => {
    gamePhase = Gamestate.findOne().gamePhase
    Session.set('gamePhase', gamePhase);
    return Session.get('gamePhase')
});

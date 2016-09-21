var express = require('express'),
    router  = express.Router( {mergeParams: true} ),
    Player  = require('../models/players'),
    Game    = require('../models/games');

//RESTful ROUTES
//INDEX 
router.get('/games', function(req, res) {
    Game.find({}, function(err, games) {
        console.log(games);
        if (err) {
            console.log(err);
        } else {
            res.render('games/index', {games: games});
        }
    });
});
//NEW 
//new game route
router.get('/games/new', function(req, res) {
    res.render('games/newGame');
});
//CREATE 
router.post('/games/new', function(req, res) {
    console.log(req.body);
    var playerNumber = req.body.playerNumber;
    var teamOne = req.body.teamOne;
    var teamTwo = req.body.teamTwo;
    var entryNumber = req.body.entryNumber;
    var pin = req.body.pin;
    var newGame = {playerNumber: playerNumber, teamOne: teamOne, teamTwo: teamTwo, entryNumber: entryNumber, pin: pin};
    Game.create(newGame, function(err, newlyCreatedGame) {
        if (err) {
            console.log(err);
        } else {
            //req.flash('success', 'You created a new Celebrity Game!');
            res.redirect('/games');
        }
    });
});
//SHOW 
router.get('/games/:id', function(req, res) {
    res.render('games/show');
});
//EDIT
//UPDATE
//DESTROY

module.exports = router;
var express = require('express'),
    router  = express.Router( {mergeParams: true} ),
    Player  = require('../models/players'),
    Game    = require('../models/games'),
    Team    = require('../models/teams');

//RESTful ROUTES
//INDEX 

router.get('/games', function(req, res) {
    Game.find({}, function(err, games) {
        if (err) {
            console.log(err);
        } else {
            res.render('games/index', {games: games});
        }
    });
});

//new game route
router.get('/games/new', function(req, res) {
    res.render('games/newGame');
});
//CREATE 
router.post('/games/new', function(req, res) {
    var playerNumber = req.body.playerNumber;
    var teamOne = req.body.teamOne;
    var teamTwo = req.body.teamTwo;
    var entryNumber = req.body.entryNumber;
    var pin = makeid();
    var newGame = {playerNumber: playerNumber, teamOne: teamOne, teamTwo: teamTwo, entryNumber: entryNumber, pin: pin};

    Game.create(newGame, function(err, newlyCreatedGame) {
        if (err) {
            console.log(err);
        } else {
            var teams = [{teamName: teamOne, gameSession: newlyCreatedGame._id}, {teamName: teamTwo, gameSession: newlyCreatedGame._id}];
            var createTeamsCb = function(err, teams) {
                if (err) {
                    console.log(err) 
                } else {
                     console.log(teams);
                }
            }
            Team.collection.insert(teams, createTeamsCb);
            
            //req.flash('success', 'You created a new Celebrity Game!');
            res.redirect('/games/' +newlyCreatedGame._id);
        }
    });
});
//SHOW 
router.get('/games/:id', function(req, res) {
    Game.findById(req.params.id, function(err, foundGame) {
        if (err) {
            console.log(err);
        } else {
            var playerIds = [];
            foundGame.player.forEach(id=>{
                playerIds.push(id);
            });
            Player.find({
                '_id': { $in: playerIds}
            }, function(err, players) {
                res.render('games/show', {game: foundGame, players: players});
            });
        }
    });
});
//EDIT
//UPDATE
//DESTROY

function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

module.exports = router;
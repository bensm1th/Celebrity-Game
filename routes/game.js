var express     = require('express'),
    router      = express.Router( {mergeParams: true} ),
    Player      = require('../models/players'),
    Game        = require('../models/games'),
    Team        = require('../models/teams'),
    Name        = require('../models/names'),
    passport    = require('passport');

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
                     //console.log(teams);
                }
            }
            Team.collection.insert(teams, createTeamsCb);

            var newPlayer = new Player( {
                username: req.body.username,
                gameSession: newlyCreatedGame.id,
                pin: newlyCreatedGame.pin,
                isManager: true
            } );

            newPlayer.save();
            newlyCreatedGame.player.push(newPlayer);
            newlyCreatedGame.save();
            Player.register(newPlayer, req.body.password, function(err, player) {
                if (err) {
                    console.log(err);
                    //req.flash('error', err.message);
                    return res.render('index');
                }
                passport.authenticate('local')(req, res, function() {
                    //req.flash('success', "Welcome to the Celebrity Game" + user.username);
                    res.redirect('/games/' + newlyCreatedGame._id);
                });
            });
            //req.flash('success', 'You created a new Celebrity Game!');
            
        }
    });
});


//SHOW 
router.get('/games/:id', function(req, res) {
    Game.findById(req.params.id, function(err, foundGame) {
        if (err) {
            console.log(err);
        } else {
            var playerNames = [];
            if(req.user && req.user.names.length>0) {
                var playerObjects = [];
                for (var i = 0; i < foundGame.entryNumber; i++) {
                    playerObjects.push(req.user.names[i])
                }
                Name.find({
                    '_id': { $in: playerObjects}
                }, function(err, players) {
                    for (var i = 0; i < foundGame.entryNumber; i++) {
                        playerNames.push(players[i].name);
                    }
                    var playerIds = [];
                    foundGame.player.forEach(id=>{
                        playerIds.push(id);
                    });
                    Player.find({
                        '_id': { $in: playerIds}
                    }, function(err, players) {
                        res.render('games/show', {game: foundGame, players: players, names: playerNames});
                    });
                });
            }
            var playerIds = [];
                    foundGame.player.forEach(id=>{
                        playerIds.push(id);
                    });
                    Player.find({
                        '_id': { $in: playerIds}
                    }, function(err, players) {
                        res.render('games/show', {game: foundGame, players: players, names: playerNames});
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
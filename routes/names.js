var express     = require('express'),
    router      = express.Router( {mergeParams: true} ),
    Player      = require('../models/players'),
    Game        = require('../models/games'),
    Team        = require('../models/teams'),
    Name        = require('../models/names'),
    passport    = require('passport');
//CREATE

router.post('/games/:id/names', function(req, res) {
    //create names for each one and associate them with the player and push them into found game

    //user req.params.id to find the game 
    
    Game.findById(req.params.id, function(err, foundGame) {
        if (err) {
            console.log(err);
        } else {
            Player.findById(req.user._id, function(err, foundUser) {
                if (err) {
                    console.log(err);
                } else {
                    console.log(foundGame);
                    var celebNames = [];
                    req.body.name.forEach(celeb=>{
                        celebNames.push(celeb);
                    });
                    for (var i = 0; i < celebNames.length; i++) {
                        var newName = new Name({
                            name: celebNames[i],
                            author: {id: foundUser._id, username: foundUser.username }
                        });
                        newName.save();
                        foundGame.names.push(newName);
                        foundGame.save();
                        foundUser.names.push(newName);
                        foundUser.save();
                    }
                    console.log(foundGame);
                    res.redirect('/games/' + foundGame._id);
                }
            });
        }
    });
    
    
});

module.exports = router;
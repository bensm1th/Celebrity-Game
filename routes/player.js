var express     = require('express'),
    router      = express.Router( {mergeParams: true} ),
    passport    = require('passport'),
    Player      = require('../models/players'),
    Game        = require('../models/games');

//RESTfult ROUTES

//INDEX ROUTE

router.get('/', function(req, res) {
    res.redirect('/players');
});
router.get('/players', function(req, res) {
    res.render('index');
});

//NEW ROUTE 
router.get('/players/new', function(req, res) {

    res.render('players/new');
});

//CREATE ROUTE 
router.post('/games/:id/players', function(req, res) {
    //look up game using id 
    Game.findById(req.params.id, function(err, game) {
        if (err) {
            console.log(err);
            res.redirect('/games/' + req.params.id);
        } else {
            var newPlayer = new Player( {
                username: req.body.username,
                gameSession: req.params.id,
                pin: game.pin
            } );
            newPlayer.save();
            game.player.push(newPlayer);
            game.save();
            Player.register(newPlayer, req.body.password, function(err, player) {
                if (err) {
                    console.log(err);
                    //req.flash('error', err.message);
                    return res.render('index');
                }
                passport.authenticate('local')(req, res, function() {
                    //req.flash('success', "Welcome to the Celebrity Game" + user.username);
                    res.redirect('/players');
                });
            });
        }
    });
});
//SHOW THE LOGIN FORM
router.get('/login', function(req, res) {
    res.render('login');
});

//LOGIN ROUTE
router.post('/login', passport.authenticate('local', {
    successRedirect: '/players',
    failureRedirect: '/login' 
    }), function(req, res) {
});
//LOUGOUT ROUTE
router.get('/logout', function(req, res) {
    req.logout();
    //req.flash('success', 'logged you out');
    res.redirect('/games')
});

//SHOW ROUTE 
router.get('/players/:id', function(req, res) {
    res.send('YOU HIT THE SHOW ROUTE');
});

//EDIT ROUTE
router.get('/players/:id/edit', function(req, res) {
    res.send('YOU HIT THE EDIT ROUTE');
});

//UPDATE ROUTE 
router.post('/players/:id/edit', function(req, res) {
    res.send('YOU HIT THE UPDATE ROUTE');
});
//DESTROY ROUTE 
router.delete('/players/:id', function(req, res) {
    res.send('YOU HIT THE DELETE ROUTE');
});


module.exports = router;


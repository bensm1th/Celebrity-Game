var express     = require('express'),
    router      = express.Router( {mergeParams: true} ),
    passport    = require('passport'),
    Player      = require('../models/players');

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
router.post('/players/new', function(req, res) {
    var newPlayer = new Player( {username: req.body.username } );

    Player.register(newPlayer, req.body.password, function(err, player) {
        if (err) {
            console.log(err);
            //req.flash('error', err.message);
            return res.render('index');
        }
        passport.authenticate('local')(req, res, function() {
            //req.flash('success', "Welcom to the Celebrity Game" + user.username);
            res.redirect('/players');
        });
    });
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


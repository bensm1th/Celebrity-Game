var express = require('express'),
    router  = express.Router( {mergeParams: true} ),
    Player  = require('../models/players');

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
    res.send('YOU HIT THE CREATE ROUTE');
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


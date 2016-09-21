var express = require('express'),
    router  = express.Router( {mergeParams: true} ),
    Player  = require('../models/players'),
    Game    = require('../models/games');

//RESTful ROUTES
//INDEX 

//NEW 
//new game route
router.get('/players/games/new', function(req, res) {
    res.render('games/newGame');
});
//CREATE 
//SHOW 
//EDIT
//UPDATE
//DESTROY

module.exports = router;
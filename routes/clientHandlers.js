var express     = require('express'),
    router      = express.Router( {mergeParams: true} ),
    passport    = require('passport');

router.get('/ajax', function(req, res) {
    res.send('clientHandlers are working');
});

module.exports = router;
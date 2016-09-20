var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    localStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash'),
    url             = process.env.DATABASEURL || 'mongodb://localhost/celebrity_game',
    port            = process.env.PORT || '3000';
    //ADD ROUTEs
mongoose.connect(url);

app.listen(port, function() {
    console.log('celebrity_game is listen on port ' + port)
});
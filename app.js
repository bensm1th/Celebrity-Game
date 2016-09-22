var express         = require('express'),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require('mongoose'),
    passport        = require('passport'),
    localStrategy   = require('passport-local'),
    methodOverride  = require('method-override'),
    flash           = require('connect-flash'),
    url             = process.env.DATABASEURL || 'mongodb://localhost/celebrity_game',
    port            = process.env.PORT || '3000',
    config          = require('./config/config'),
    Player          = require('./models/players'),
    Game            = require('./models/games'),
    //ADD ROUTEs
    playerRoutes    = require('./routes/player'),
    gameRoutes      = require('./routes/game'),
    namesRoutes     = require('./routes/names');

mongoose.connect(url);

app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(flash());

//PASSPORT CONFIG
app.use(require('express-session')({
    secret: config.passportSecret,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(Player.authenticate()));
passport.serializeUser(Player.serializeUser());
passport.deserializeUser(Player.deserializeUser());

app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash('error');
    res.locals.success = req.flash('success');
    next();
});

app.use(playerRoutes);
app.use(gameRoutes);
app.use(namesRoutes);

app.listen(port, function() {
    console.log('celebrity_game is listening on port ' + port)
});
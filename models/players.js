var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');

var playerSchema = new mongoose.Schema({
    username: String,
    password: String,
    isManager: Boolean,
    team: String,
    gameSession: String,
    pin: Number
});

playerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Player', playerSchema);
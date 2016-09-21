var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');

var playerSchema = new mongoose.Schema({
    username: String,
    password: String,
    isManager: Boolean,
    teamName: String,
    gameSession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    },
    pin: Number
});

playerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Player', playerSchema);
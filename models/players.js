var mongoose                = require('mongoose'),
    passportLocalMongoose   = require('passport-local-mongoose');

var playerSchema = new mongoose.Schema({
    username: String,
    password: String,
    isManager: {type: Boolean, default: false},
    teamName: String,
    gameSession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    },
    pin: String,
    names: [{
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Name'
        }
    }]
});

playerSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('Player', playerSchema);
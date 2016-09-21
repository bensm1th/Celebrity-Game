var mongoose                = require('mongoose');

var gameSchema = new mongoose.Schema({
    playerNumber: Number,
    teamOne: String,
    teamTwo: String,
    entryNumber: Number,
    pin: String,
    player: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }
    ],
    names: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Name'
        },
    }
});


module.exports = mongoose.model('Game', gameSchema);
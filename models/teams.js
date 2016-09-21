var mongoose                = require('mongoose');

var teamSchema = new mongoose.Schema({
    teamName: String,
    player: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        }
    ],
    gameSession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Game"
    },
});

module.exports = mongoose.model('Team', teamSchema);
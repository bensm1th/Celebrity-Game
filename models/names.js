var mongoose = require('mongoose');

var nameSchema = new mongoose.Schema({
    name: String,
    author: {
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Player'
        },
        username: String
    }
});

module.exports = mongoose.model("Name", nameSchema);
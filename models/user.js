const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const suggestionSchema =  new Schema ({
    suggestion: String, 
});

const userSchema = new Schema ({
    name: String,
    email: String,
    suggestions: [suggestionSchema],
    googleId: String
});

//only store saved suggestions!!! to the user/
//look at student facts schema 
//i am embedding SAVED suggestions into the user suggestions array
//suggesion isnt saved to the database its only when the user saves t
//the suggestions 

module.exports = mongoose.model('User', userSchema);
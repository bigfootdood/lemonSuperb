const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const { Schema } = mongoose;


const petSchema = new Schema({
    name: {type: String, required: true},
    _id: { type: String, default: uuidv4 },
    species: {type: Number, required: true},
    color: {type: String, required: true},
    age: {type: Number, default: 0},
    hunger: {type: Number, default: 100},
    thirst: {type: Number, default: 100},
    sick: {type: Boolean, default: false},
    alive: {type: Boolean, default: true},
    habitat: {type: Number, default: 0},
    mentalHealth:{type:Number, default:100}
});
 


var Pet = mongoose.model('Pet', petSchema);
 
module.exports = Pet;
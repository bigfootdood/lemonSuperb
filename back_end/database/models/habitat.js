const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const { Schema } = mongoose;


const petSchema = new Schema({
    name: {type: String, required: true},
    _id: { type: String, default: uuidv4 },
    species: {type: Number, required: true},
    color: {type: String, required: true},
    age: Number,
    hunger: Number,
    thirst: Number,
    sick: Boolean
});
 

const habitatSchema  = new Schema(
{
    name: {type: String, required: true},
    background: Number,
    _id: { type: String, default: uuidv4 },
    pet_in_habitat: petSchema
});

var Habitat = mongoose.model('Habitat', habitatSchema);
 
module.exports = Habitat;
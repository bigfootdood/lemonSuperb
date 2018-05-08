const mongoose = require('mongoose');
const uuidv4 = require('uuid/v4');
const { Schema } = mongoose;


const petSchema = new Schema({
    name: {type: String, required: true},
    _id: { type: String, default: uuidv4 },
    species: {type: String, required: true},
    color: {type: String, required: true},
    age: {type: String},
    hunger: {type: String},
    thirst: {type: String},
    sick: {type: String}
});
 

const habitatSchema  = new Schema(
{
    name: {type: String, required: true},
    background: {type: String},
    _id: { type: String, default: uuidv4 },
    pets_in_habitat: [petSchema]
});

var Habitat = mongoose.model('Habitat', habitatSchema);
 
module.exports = Habitat;
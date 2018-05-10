const Pets = require('../models/pet');

module.exports = {
    //Gets all pets
    async getAllPets() {
        const petList = await Pets.find();
        
        return petList;
    },

    //Gets pet by ID
    async getPetById(id){
        if(!id) throw "You must provide an id to search for";

        const petCollection = await Pets();

        const pet = await petCollection.findOne({_id: id});

        if (pet === null) throw "No pet with that id";
        return pet;
    },

    //Adds pet with fields Name, Species, and Color
    async addPet(name, species, color) {
        const petCollection = await Pets();
        const newPet = new Pets({
            name,
            species,
            color
        });
        
        const insertInfo = await petCollection.insertOne(newPet);
       
        if (insertInfo.insertedCount === 0) throw "Could not add pet";
        
        const newId = insertInfo.insertedId;

        const pet = await this.getPetById(newId);
        return pet;
    },

    /**
     * 
     * @param {*} id pet id
     * @param {*} updates object of pets changed attribs i.e.
     *      {
     *          hunger: 98,
     *          thirst: 98
     *      }
     */
    async updateSpecPet(id, updates){
        if (!id) throw "You must provide id";

        if (!updates) throw "You must provide updated data";

        const petCollection = await Pets();
        const updatedPet = { 
            $set : updates
            
        }
        const updatedInfo = await petCollection.updateOne({ _id: id }, updatedPet);
        if (updatedInfo.modifiedCount === 0) {
            throw "could not update pet successfully";
        }

        return await this.getPetById(id);
    },
    //Removes pet
    async removePet(id) {
        if (!id) throw "You must provide an id to search for";
    
        const petCollection = await Pets();
        const deletionInfo = await petCollection.removeOne({ _id: id });
    
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete pet with id of ${id}`;
        }
    }
};


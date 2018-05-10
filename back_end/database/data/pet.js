const Pets = require('../models/pet');

module.exports = {
    async getAllPets() {
        const petList = await Pets.find();
        
        return petList;
    },

    async getPetById(id){
        if(!id) throw "You must provide an id to search for";

        const petCollection = await Pets();

        const pet = await petCollection.findOne({_id: id});

        if (pet === null) throw "No pet with that id";
        return pet;
    },

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

    async removePet(id) {
        if (!id) throw "You must provide an id to search for";
    
        const petCollection = await Pets();
        const deletionInfo = await petCollection.removeOne({ _id: id });
    
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete pet with id of ${id}`;
        }
    }
};


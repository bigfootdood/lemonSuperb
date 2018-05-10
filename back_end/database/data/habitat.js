const Habitats = require('../models/habitat');

module.exports = {
    async getAllHabitats() {
        const habitatList = await Habitats.find();
        
        return habitatList;
    },

    async getHabitatById(id){
        if(!id) throw "You must provide an id to search for";

        const habitatCollection = await Habitats();

        const habitat = await habitatCollection.findOne({_id: id});

        if (habitat === null) throw "No habitat with that id";
        return habitat;
    },

    async addHabitat(name, background) {
        const habitatCollection = await Habitats();
        const newHabitat = new Habitats({
            name,
            background,
            pet_in_habitat
        });
        
        const insertInfo = await habitatCollection.insertOne(newHabitat);
       
        if (insertInfo.insertedCount === 0) throw "Could not add habitat";
        
        const newId = insertInfo.insertedId;

        const habitat = await this.getHabitatById(newId);
        return habitat;
    },

    async updateSpecHabitat(id, updates){
        if (!id) throw "You must provide id";

        if (!updates) throw "You must provide updated data";

        const habitatCollection = await Habitats();
        const updatedHabitat = { 
            $set : updates
            
        }
        const updatedInfo = await habitatCollection.updateOne({ _id: id }, updatedHabitat);
        if (updatedInfo.modifiedCount === 0) {
            throw "could not update habitat successfully";
        }

        return await this.getHabitatById(id);
    },

    async removeHabitat(id) {
        if (!id) throw "You must provide an id to search for";
    
        const habitatCollection = await Habitats();
        const deletionInfo = await habitatCollection.removeOne({ _id: id });
    
        if (deletionInfo.deletedCount === 0) {
          throw `Could not delete habitat with id of ${id}`;
        }
    }
};


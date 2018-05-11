const Pets = require('../models/pet');

module.exports = {
    //Gets all pets
    async getAllPets() {
        const petList = await Pets.find();

        return petList;
    },

    async getPet(pet_name) {
        if(!pet_name) throw "Must provide a name";
        const pet = await Pets.findOne({name: pet_name});

        if (pet === null) throw "No pet with that name";
        return pet;
     },

    //Gets pet by ID
    async getPetById(id){
        if(!id) throw "You must provide an id to search for";

        const pet = await Pets.findOne({_id: id});

        if (pet === null) throw "No pet with that id";
        return pet;
    },

    //Adds pet with fields Name, Species, and Color
    async addPet(name, species, color) {

        const newPet = new Pets({
            name,
            species,
            color
        });

		await newPet.save(); // Will throw if anything types are bad

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

        const updateObj = {
            $set : updates

        }
        const updatedPet = await Pets.findOneAndUpdate(
            { _id: id},
            updateObj,
            { new: true } // Returns new object
        );
        if (!updatedPet)
            throw Error(`Pet does not exist! (ID: ${id})`);

        return await this.getPetById(id);
    },
    //Removes pet
    async removePet(id) {
        if (!id) throw "You must provide an id to search for";

        const delObj = await Pets.find({ _id: id}).remove().exec();

        if (delObj === null) {
          throw `Could not delete pet with id of ${id}`;
        }
    }
};

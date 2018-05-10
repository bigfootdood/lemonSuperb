const bcrypt = require('bcryptjs');
const Users = require('../models/user');

module.exports = {

    //gets user by username
    async getUser(userN) {
        if(!userN) throw "Must provide a username";
        const user = await Users.findOne({userName: userN});

        if (user === null) throw "No pet with that id";
        return user;       
     },

    //gets user by id
    async getUserById(id) {
        if(!id) throw "You must provide an id to search for";

        const user = await Users.findOne({_id: id});

        if (user === null) throw "No pet with that id";
        return user;
    },

    //adds user to DB
    async addUser(userN, password) {

        const newUser = new Users({
            userN,
            password
        });
        
		await newUser.save(); // Will throw if anything types are bad

    },

    //takes user ID and petID
    async adoptPet(id, petID){
        if (!id) throw "You must provide id";

        if (!petID) throw "You must provide petID";

        const newPet = { 
            petId : petID
        }
        const updatedUser = await Users.findOneAndUpdate(
            { _id: id},
            {$set : newPet},
            { new: true } // Returns new object
        );
        if (!updatedUser)
            throw Error(`Pet does not exist! (ID: ${id})`);

        return await this.getUserById(id);
    }, 

    //set last login to date.now
    async updateLastLogin(id){
        if (!id) throw "You must provide id";

        const login = { 
            lastLogin : Date.now()
        }
        const updatedUser = await Users.findOneAndUpdate(
            { _id: id},
            {$set : login},
            { new: true } // Returns new object
        );
        if (!updatedUser)
            throw Error(`Pet does not exist! (ID: ${id})`);

        return await this.getUserById(id);
    },

    //set new user to false
    async notNewUser(id){
        if (!id) throw "You must provide id";

        const notNew = { 
            newUser : false
        }
        const updatedUser = await Users.findOneAndUpdate(
            { _id: id},
            {$set : notNew},
            { new: true } // Returns new object
        );
        if (!updatedUser)
            throw Error(`Pet does not exist! (ID: ${id})`);

        return await this.getUserById(id);
    },
    
    async validate(user ,password){
        if(!password) throw "Must provide a username and password"
            return await bcrypt.compare(password, user.hashedPassword);
    }
};
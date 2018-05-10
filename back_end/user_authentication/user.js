var user = require('../database/models/user');
var bcrypt = require('bcryptjs');


class User {
	constructor(data) {
		Object.assign(this, data);
	}

checkPassword(candidatePass) {
		return bcrypt.compare(candidatePass, this.hashedPassword);
	}

	static findUserById(id) {
		for (const data of user) {
			if (data._id === id) return new User(data);
		}
		throw `User not found. (ID: ${id})`;
	}

	static findUserByName(userName) {
		for (const data of user) {
			if (data.userName.toLowerCase() === userName.toLowerCase())
				return new User(data);
		}
		throw `User not found. (Username: ${userName})`;
	}
}

module.exports = User;

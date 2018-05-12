const database = require("../database/data");
require("../database")

async function main(){
  let user = await database.user.getUserById("7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");


  let curr_time = Date.now();
  let last_time = user['lastLogin'];
  let diff_hours = Math.floor((curr_time-last_time)/3600000);

  let pet = await database.pet.getPetById(user['petId'])

  if(pet["sick"]){
    diff_hours = diff_hours * 3
  }

  let hunger = pet['hunger']
  hunger -= (diff_hours*100/72)
  let thirst = pet['thirst']
  thirst -= (diff_hours*100/24)
  let mentalHealth =  pet['mentalHealth']
  mentalHealth -= (diff_hours*100/8)
  await console.log("MAIN PET: " + pet);
  pet = await database.pet.updateSpecPet(pet["_id"], {"hunger": hunger, "thirst": thirst, "mentalHealth": mentalHealth});


  if(hunger <= 0 || thirst <=0){
    temp = await database.pet.updateSpecPet(pet["_id"], {"alive": false})
  }

  if(mentalHealth < 50){
    if(getRandomInt(3) == 1){
       temp = await database.pet.updateSpecPet(pet["_id"], {"sick": true})
    }
  }
  else {
    if(getRandomInt(6) == 1){
      temp = await database.pet.updateSpecPet(pet["_id"], {"sick": true})
    }
  }

}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

async function createUser(userName, hashedPassword){
  await database.user.addUser(userName, hashedPassword);
  return await database.user.getUser(userName);
}

async function addPetToUser(user_id, pet_id){
  return await database.user.adoptPet(user_id, pet_id);
}

async function createPet(pet_name, species, color, habitat){
  await database.pet.addPet(pet_name, species, color);
  let pet = await database.pet.getPet(pet_name);
  console.log("PET IMPORTANT: " + pet);
  pet = await database.pet.updateSpecPet(pet["_id"], {"habitat": habitat});
  return pet;
}

async function testing_print(){
  let pets = await database.pet.getAllPets();
  let users = await database.user.getAllUsers();
  console.log("Pets: ");
  console.log(pets);
  console.log("Users: ");
  console.log(users);
}

async function get_hash(user){
  let users = await database.user.getAllUsers();
  for (var i = 0; i < users.length; i++) {
    if(users[i]["username"] == user){
      return users[i]["hashedPassword"];
    }
  }
  return "";
}


module.exports.main = main;
module.exports.createUser = createUser;
module.exports.addPetToUser = addPetToUser;
module.exports.createPet = createPet;
module.exports.get_hash = get_hash;

module.exports.testing_print = testing_print;


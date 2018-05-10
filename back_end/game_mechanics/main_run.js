//Testing with seed
// const seed = require('../database/tasks/seed');

const database = require("../database/data");
require("../database")

//require data folder
  //user-pets-habitits functions
//require cookie
async function main(){
  console.log(database);


  // await database.user.addUser("ryan", "sucks");

  // console.log("Before Change: ");
  // console.log(userList);

  let user = await database.user.adoptPet("7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310", "the_pet_id");
  let userList = await database.user.getAllUsers();
  console.log(userList);
  // console.log(user);

  // let user = await database.user.getUserById("7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310");







  //
  // let temp2 = await database.pet.getAllPets();
  // console.log("Original: ");
  // console.log(temp2);
  // // pet_to_update = temp2[0]
  // // pet_to_update_id = pet_to_update["_id"]
  // let pet_updated = await database.pet.updateSpecPet(temp2[0]["_id"], {"name": "smelly butt"})
  // let all_pets = await database.pet.getAllPets()
  // console.log("After update: ");
  // console.log(all_pets);




// "7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310"    Test user ID
  // let user = get userID from cookie
  // let curr_time = Date.now();
  // let last_time = user['lastlogin']
  // let diff_hours = floor((curr_time-last_time)/3600000;

  // let pet = database.pet.getPetById(user['petId'])

  // if(pet["sick"]){
  //   diff_hours = diff_hours * 3
  // }

  // let hunger = pet['hunger']
  // hunger -= (diff_hours*100/72)
  // let thirst = pet['thirst']
  // thirst -= (diff_hours*100/24)
  // let mentalHealth =  pet['mentalHealth']
  // mentalHealth = (diff_hours*100/8)

  // if hunger <= 0 or thirst <=0 {
  //   temp = database.pet.updateSpecPet(pet["_id"], {"alive": false})
  // }

  // if(mentalHealth < 50){
  //   if(getRandomInt(3) == 1){
  //      temp = database.pet.updateSpecPet(pet["_id"], {"sick": true})
  //   }
  // }
  // else {
  //   if(getRandomInt(6) == 1){
  //     temp = database.pet.updateSpecPet(pet["_id"], {"sick": true})
  //   }
  // }

  //update values based on difference
  //get pet_hunger
  //calc new pet_hunger
  //if < 0 kill pet => update alive to false
  //update pet_hunger to new pet_hunger

  //get thirst_hunger
  //calc new thirst_hunger
  //if < 0 kill pet => update alive to false
  //update thirst_hunger to new thirst_hunger

  //do all the stuff
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

main()

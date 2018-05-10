//Testing with seed
const seed = require('../database/tasks/seed');

const database = require("../database/data");


//require data folder
  //user-pets-habitits functions
//require cookie
async function main(){
  console.log(database);
  // let temp = await database.pet.getAllPets();
  // console.log("Original pets: ");
  // console.log(temp);
  //
  // await database.pet.addPet("waffles", 3, "#123456");
  // temp = await database.pet.getAllPets();
  // console.log("Added pets: ");
  // console.log(temp);
  //
  // console.log("about to remove");
  // let pet = await database.pet.removePet(temp[0]["_id"]);
  // console.log("done remove");
  // console.log("Pet that was removed: ");
  // console.log(pet);
  //
  // temp = await database.pet.getAllPets();
  // console.log("New pets: ");
  // console.log(temp);





  let temp2 = await database.pet.getAllPets();
  console.log("Original: ");
  console.log(temp2);
  // pet_to_update = temp2[0]
  // pet_to_update_id = pet_to_update["_id"]
  let all_pets = await database.pet.getAllPets()
  console.log("After update: ");
  console.log(all_pets);























  //get userID from cookie

  //get current time
  //get old user time
  //calc difference

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

main()

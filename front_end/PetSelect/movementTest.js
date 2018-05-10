// var pet = this.getObjectByName("Pet");

function movement(x,y,z){
  pet.position.y +=y;
  pet.position.x +=x;
  pet.position.z +=z;
}

(function loop() {
    var rand = Math.round(Math.random() * (3000 - 500)) + 500;
    setTimeout(function() {
            randMove();
            loop();
    }, rand);
}());

function randMove(x,y,z){
  // initial x,y,z = 1,0,0
  const MAX_COORD = 10
  var x = Math.round(Math.random() + 1)
  var  y = Math.round(Math.random() + 1)
  var z = Math.round(Math.random() + 1)
  if(x == MAX_COORD || y == MAX_COORD || z == MAX_COORD){
    pet.position.x -= x;
    pet.position.y -= y;
    pet.position.z -= z;
    }
  else{
      if(pet.position.x == pet.position.y ||pet.position.z == pet.position.y ){
         pet.position.x += Math.round(pet.position.y / pet.position.z) + 1
         pet.position.y += Math.round(pet.position.y / pet.position.x) + 1
         pet.position.z += Math.round(pet.position.x / pet.position.z) + 1
      }
    }

}

function update(event){
  setTimeout(randMove(1,0,0), 3000);

}

var seeder = require('mongoose-seed');
const config = require('../config');

const MONGO_URL = config.serverUrl + config.dbName;
// Connect to MongoDB via Mongoose
seeder.connect(MONGO_URL, async function() {
 
  // Load Mongoose models
  await seeder.loadModels([
    '../database/models/pet.js',
    '../database/models/user.js'
  ]);
 
  // Clear specified collections
  await seeder.clearModels(['Pet', 'User'], async function() {
 
    // Callback to populate DB once collections have been cleared
    await seeder.populateModels(data, async function() {
      await seeder.disconnect();
    });

  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'User',
        'documents': [
            {
                '_id':'7b7997a2-c0d2-4f8c-b27a-6a1d4b5b6310',
                'sessionId':'b3988882-627f-4c59-8d5d-54b7a43b030e',
                'userName': 'derk123',
                'hashedPassword':'$2a$08$XdvNkfdNIL8Fq7l8xsuIUeSbNOFgK0M0iV5HOskfVn7.PWncShU.O',
                'petId':'c5d0fd67-7977-4fc5-9088-33d0347c932b',
                'newUser': false,
                'lastLogin': 1525970283406
            }
        ]
    },
    {
        'model': 'Pet',
        'documents': [
            {
                "name":"Franky",
                "_id":"c5d0fd67-7977-4fc5-9088-33d0347c932b",
                "species": 3,
                "color": "#8B4513",
                "age": 4,
                "hunger": 5,
                "thirst": 3,
                "sick": false,
                "alive": true,
                "habitat": 0
            }
        ]
    }
];
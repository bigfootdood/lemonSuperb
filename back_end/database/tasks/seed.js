var seeder = require('mongoose-seed');
const config = require('./config');

const MONGO_URL = config.serverUrl + config.dbName;
// Connect to MongoDB via Mongoose
seeder.connect(MONGO_URL, function() {
 
  // Load Mongoose models
  seeder.loadModels([
    'models/habitat.js',
    'models/user.js'
  ]);
 
  // Clear specified collections
  seeder.clearModels(['Habitats', 'Users'], function() {
 
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });

  });
});
 
// Data array containing seed data - documents organized by Model
var data = [
    {
        'model': 'Model1',
        'documents': [
            {
                'name': 'Doc1',
                'value': 200
            },
            {
                'name': 'Doc2',
                'value': 400
            }
        ]
    }
];
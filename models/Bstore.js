const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


var bstoreSchema = new mongoose.Schema({
  name: String,
  price: String,
  photo: String,
});

module.exports = mongoose.model('Bstore', bstoreSchema);
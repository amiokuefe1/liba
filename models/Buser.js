const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');
// help us to easily create user account without using much boiler plate codes

var buserSchema = new mongoose.Schema({
  name:{
  	type: String,
  	required: 'Please give a name',
  	trim: true
  },
  email: {
  	type: String,
  	unique: true,
  	lowercase: true,
  	trim: true,
  	validate:[validator.isEmail, 'Invalid Email'],
  	required: 'Please supply a valid email'
  }
});

buserSchema.plugin(passportLocalMongoose, { usernameField: 'email'});
// the above enables us to use email as login requisite
buserSchema.plugin(mongodbErrorHandler);
// any error we get from our schema mongodbErrorHandler will make readable in plain language

module.exports = mongoose.model('Buser', buserSchema);
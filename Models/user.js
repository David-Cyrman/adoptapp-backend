'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    Name: String,
    LastName: String, 
    Email: String,
    Password: String,
    Role: String,
    Image:String    
});

module.exports = mongoose.model('User', UserSchema);

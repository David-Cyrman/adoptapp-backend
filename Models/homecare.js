'use strict'

var mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var HomeCare = Schema({
    Name: String,
    Location: String,
    URL: String,
    User: {type: Schema.ObjectId, ref: 'User'},
    Animal: {type: Schema.ObjectId, ref: 'Animal'},
});

module.exports = mongoose.model('HomeCare', HomeCare);

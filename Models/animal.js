'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AnimalSchema = Schema({
    Name: String,
    Year: Number,
    Description: String,
    Image: String,
    User: {type: Schema.ObjectId, ref: 'User'},
    HomeCare: {type: Schema.ObjectId, ref: 'HomeCare'}
});

module.exports = mongoose.model('Animal', AnimalSchema);

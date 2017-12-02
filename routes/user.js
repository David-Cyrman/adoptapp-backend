'use strict'

var express = require('express');
var UserController = require('../Controllers/user');

var api = express.Router();

//middleware
var md_auth = require('../middleware/authenticated');

//upload 
var multipart = require('connect-multiparty');
var md_upload = multipart({ uploadDir: './uploads/users' });


//Controlador Users
api.post('/pruebas-controller', md_auth.ensureAuth, UserController.pruebas);
api.post('/register', UserController.SaveUser);
api.post('/login', UserController.login);
api.put('/UpdateUser/:id', md_auth.ensureAuth, UserController.UpdateUser);
//api.post('/UploadImageUser/:id', [md_auth.ensureAuth, md_upload], UserController.UploadImage);


module.exports = api;
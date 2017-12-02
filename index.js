'use strict'

var mongoose = require('mongoose');
var app = require('./app');
var port = process.env.PORT || 3789;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/AdoptApp', { useMongoClient: true })
    .then(() => {
        console.log("La conneccion a la base de datos AdoptApp se ha realizado correctamente ;)");

        app.listen(port, () => {
            console.log("El servidor LOCAL con NODE y EXPRESS esta corriendo correctamente");
        });
    }).catch(err => console.log(err));

//aqui termina la conneccion a la DB


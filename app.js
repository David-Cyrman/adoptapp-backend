'use strict'

var express = require('express');
var bodyParser = require('body-parser');

var app = express();

//cargar rutas
var user_routes = require('./routes/user');


//body parser (convierte a JSON los objetos) - middlewares
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Configurar cabeceras y cors


//rutas bases CUIDADO!
app.use("/api", user_routes);


module.exports = app;



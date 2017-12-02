'use strict'

var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'clave_secreta_de_AdoptApp_1234';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        name: user.Name,
        lastname: user.LastName,
        email: user.Email,
        role: user.role,
        image: user.Image,
        iat: moment().unix(),
        exp:moment().add(30, 'days').unix()
    };

    return jwt.encode(payload, secret);
};
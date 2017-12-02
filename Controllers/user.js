'use strict'


//modulos
var bcrypt = require('bcrypt-nodejs');

//modelos
var User = require('../Models/user');

//servicio jwt
var jwt = require('../Services/jwt');


//acciones
function pruebas(req, res) {
    res.status(200).send({
        message: 'Probando controlador usuarios y la accion pruebas',
        user: req.user
    });

}

//CREATE METHOD
function SaveUser(req, res) {

    //creamos el objeto del usuario
    var user = new User();

    //recoger los parametros de la peticion 
    var params = req.body;
    console.log(params);

    if (params.Password && params.Name && params.Email && params.LastName) {

        //asignar valores al usuario
        user.Name = params.Name;
        user.LastName = params.LastName;
        user.Email = params.Email;
        user.Password = params.Password;
        User.Role = 'ROLE_USER';
        User.Image = null;

        //BUSCA EN LA DB QUE EL EMAIL NO ESTE REPETIDO
        User.findOne({ Email: user.Email }, (err, isSetUser) => {
            if (err) {
                res.status(500)
                    .send({ message: 'Error al confirmar si el usuario existe!' });
            } else {
                if (!isSetUser) {
                    //cifrar contraseña
                    bcrypt.hash(params.Password, null, null, function (err, hash) {
                        user.Password = hash;

                        //guardar user a la DB
                        user.save((err, userStored) => {
                            if (err) {
                                res.status(500)
                                    .send({ message: 'Error al guardar el Usuario!' });
                            } else {
                                if (!userStored) {
                                    res.status(404)
                                        .send({ message: 'No se ha registrado el Usuario!' });
                                } else {
                                    res.status(200)
                                        .send({ user: userStored });
                                }
                            }
                        });

                    });
                } else {
                    res.status(200)
                        .send({ message: "El usuario no puede registrarse, ya que este ya existe" });
                }
            }

        });

    } else {
        res.status(200).send({
            message: "Introduce los datos correctamente para registrar al usuario exitosamente."
        });
    }

}

function login(req, res) {
    var params = req.body;
    var email = params.Email;
    var pass = params.Password;

    User.findOne({ Email: email }, (err, user) => {
        if (err) {
            res.status(500).send({
                message: 'Error al comprobar el usuario'
            });

        } else {
            if (user) {
                //validamos contraseña y correo validos
                bcrypt.compare(pass, user.Password, (err, check) => {
                    if (check) {

                        //comprobamos token y generar
                        if (params.gettoken) {
                            //devolvemos toker jwt
                            res.status(200).send({
                                token: jwt.createToken(user)
                            });
                        } else {
                            res.status(200).send({ user });
                        }

                    } else {
                        res.status(404).send({
                            message: "Contraseña invalida"
                        });
                    }
                })

                //mensaje de error en caso q el correo no exista 
            } else {
                res.status(404).send({
                    message: "El usuario no ha podido iniciar session."
                });
            }
        }
    });
}


//UPDATE USER
function UpdateUser(req, res) {

    var userId = req.params.id;
    var update = req.body;

    if (userId != req.user.sub) {
        return res.status(500).send({ message: "No tienes permisos para actualizar el usuario" });
    }

    User.findByIdAndUpdate(userId, update, { new: true }, (err, UserUpdated) => {
        if (err) {
            res.status(500).send({
                message: "Error al actualizar el usuario"
            });
        } else {
            if (!UserUpdated) {
                res.status(404).send({
                    message: "No se pudo actualizar el usuario"
                });
            } else {
                res.status(200).send({ user: UserUpdated });
            }
        }
    });
}

function UploadImage(req, res) {
    var userId = req.params.id;
    var file_name = 'No hay archivos subidos';

    if (req.files) {
        var file_path = req.files.Image.path;
        var file_split = file_path.split('\\');
        var file_name = file_split[2];

        res.status(200).send({
            file_path: file_path,
            file_split: file_split,
            file_name: file_name

        });

    } else {
        res.status(200).send({ message: "No se han subido la imagen" });
    }
}

//jalamos todas las funciones existentes
module.exports = {
    pruebas,
    SaveUser,
    login,
    UpdateUser,
    //UploadImage
};
const { Schema, model } = require('mongoose');

const UsuarioSchema = Schema({
    idU:{
        type: String,
        required: true,
        unique:true,
    },
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password :{
        type: String,
        required: true,
    }
});

module.exports= model('Usuario', UsuarioSchema);
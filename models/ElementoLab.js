const { Schema, model } = require('mongoose');

const ElementoLabSchema = Schema({
    idElemento:{
        type: String,
        required: true,
        unique: true,
    },
    nombre:{
        type: String, 
        required: true, 
    },
    descripcion:{
        type: String,
        required: false,
    },
    categoria:{
        type: String, 
        required: true, 
    },
    laboratorio: {
        type: Schema.Types.ObjectId,
        ref: 'Laboratorio',
        required: true,
    },
    proyecto: {
        type: Schema.Types.ObjectId,
        ref: 'Proyecto',
        required: true,
    }
});

module.exports= model('ElementoLab', ElementoLabSchema);
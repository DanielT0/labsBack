const { Schema, model } = require('mongoose');

const ElementoSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    prestado:{
        type: String,
        required: true,
    },
    descripcion :{
        type: String,
        required: true,
    },
    categoria :{
        type: String,
        required: false,
    },
    laboratorio: {
        type: Schema.Types.ObjectId,
        ref: 'Laboratorio',
        required: true,
    }
});

module.exports= model('Elemento', ElementoSchema);
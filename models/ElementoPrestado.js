const { Schema, model } = require('mongoose');

const ElementoPrestadoSchema = Schema({
    idElemento:{
        type: Schema.Types.ObjectId,
        ref: 'Elemento',
        required: true,
    },
    idUsuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    fechaPrestamo:{
        type: Date,
        required: true,
    },
    fechaDevolucion:{
        type: Date,
        required: true,
    },
    observaciones:{
        type: String,
        required: false,
    }
});
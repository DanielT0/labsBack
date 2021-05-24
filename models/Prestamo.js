const { Schema, model } = require('mongoose');

const PrestamoSchema = Schema({
    idElemento:{
        type: Schema.Types.ObjectId,
        ref: 'ElementoLab',
        required: true,
    },
    idUsuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    cantidad:{
        type: Number,
        required: true,
    },
    fechaPrestamo :{
        type: Date,
        required: true,
    },
    fechaDevolucion :{
        type: Date,
        required: true,
    },
    observaciones:{
        type: String, 
        required: true, 
    },
});

module.exports= model('Prestamo', PrestamoSchema);
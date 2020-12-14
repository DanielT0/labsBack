const { Schema, model } = require('mongoose');

const LaboratorioSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    descripcion:{
        type: String,
        required: true,
    },
});

module.exports= model('Laboratorio', LaboratorioSchema);
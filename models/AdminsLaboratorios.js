const { Schema, model } = require('mongoose');

const AdminLaboratoriosSchema = Schema({
    idAdmin:{
        type: Schema.Types.ObjectId,
        ref: 'Elemento',
        required: true,
    },
    idLaboratorio:{
        type: Schema.Types.ObjectId,
        ref: 'Laboratorio',
        required: true,
    },
});

const { Schema, model } = require('mongoose');

const ProyectoSchema = Schema({
    nombre:{
        type: String,
        required: true,
    },
    laboratorio: {
        type: Schema.Types.ObjectId,
        ref: 'Laboratorio',
        required: true,
    }
});

ProyectoSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})

module.exports= model('Proyecto', ProyectoSchema);
const { Schema, model } = require('mongoose');

const AdminCentralSchema = Schema({
    idAdmin:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
});

AdminCentralSchema.method('toJSON', function(){
    const {__v, _id, ...object} = this.toObject();
    object.id = _id;
    return object;
})


module.exports= model('AdminCentral', AdminCentralSchema);

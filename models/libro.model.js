const {Schema, model} = require('mongoose');

const libroSchema = Schema ({
    nombreLibro: {
        type: String,
        required: true
    },
    autor: {
        type: String
    },
    stock: {
        type: Number,
        required: true
    },
    usuario: {
        type: String,
        required: true
    },
    editorial: {
        type: String,
        required:true
    }
})

libroSchema.method('toJSON', function() {
    const { __v, _id, ...object} = this.toObject();

    object.uid = _id;

    return object;
})

module.exports = model('libro', libroSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    _id: { type: Number },
    nome: { 
        type: String,
        maxlength: [40, "The nome of the curso should be less then of 40 characters" ], 
        required: [true, "The nome can't be blank"]
    },
});

schema.methods.toJSON = function() {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
    return obj;
}

module.exports = mongoose.model('Curso', schema);
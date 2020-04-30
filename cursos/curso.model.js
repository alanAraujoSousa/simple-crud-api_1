const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    _id: { type: Number },
    nome: { 
        type: String,
        maxlength: [40, "The nome of the curso should be less then of 40 characters" ], 
        required: [true, "The nome can't be blank"]
    }
}, {
    toObject: {
      transform: function (doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
      }
    }
});

module.exports = mongoose.model('Curso', schema);
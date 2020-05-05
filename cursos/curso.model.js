const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const schema = new Schema({
    _id: { 
      type: Number, 
      required: [true, "The matricula should be provided"]
    },
    nome: { 
        type: String,
        maxlength: [40, "The nome of the curso should be less then of 40 characters" ], 
        required: [true, "The nome can't be blank"]
    }
}, {
    toObject: { 
      transform: function (doc, ret) {
        delete ret.__v;
      }
    },
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
      }
    }
});

module.exports = mongoose.model('Curso', schema);
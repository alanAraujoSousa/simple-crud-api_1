const mongoose = require('mongoose');
const uuid = require('node-uuid');
const { cpf } = require('cpf-cnpj-validator');

const Schema = mongoose.Schema;

const schema = new Schema({
    _id: { type: String, default: uuid.v1},
    nome: { 
        type: String, 
        maxlength: [40, "The nome of the pessoa should be equal or less then of 40 characters" ], 
        required: [true, "The nome can't be blank"]
    },
    cpf: { 
        type: String, 
        required: [true, "The CPF can't be blank"],
        unique: true,
        validate: {
            validator: function(cpfValue) {
                return cpf.isValid(cpfValue);
            },
            message: "The CPF isn't valid!"
        },
    },
    telefone: { 
        type: Number,
        max: [999999999999999, "The telefone should be equal or less than 15 digits"]
    },
    cursos: [
        { 
            type: mongoose.Schema.Types.ObjectId,
            ref: "Curso"
        }
    ]
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

module.exports = mongoose.model('Pessoa', schema);
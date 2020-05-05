const mongoose = require('mongoose');
const { cpf } = require('cpf-cnpj-validator');

const Schema = mongoose.Schema;

const schema = new Schema({
    
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
                let isValid = false;
                isValid = /^\d{3}.\d{3}.\d{3}-\d{2}$/.test(cpfValue);
                isValid = cpf.isValid(cpfValue);
                return isValid;
            },
            message: "The CPF isn't valid, please give a valid number in format: XXX.XXX.XXX-XX"
        },
    },
    telefone: { 
        type: String,
        match: [/^\(\d{3}\)\d{5}-\d{4}$/, "The telefone is invalid, please give in format (xxx)xxxxx-xxxx"],
    },
    cursos: [
        { 
            type: Number,
            ref: "Curso"
        }
    ]
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

module.exports = mongoose.model('Pessoa', schema);
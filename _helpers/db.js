import { connectionString } from 'config.json';
import { connect, Promise } from 'mongoose';

connect(process.env.MONGODB_URI || connectionString, { useCreateIndex: true, useNewUrlParser: true });
Promise = global.Promise;

export default {
    Pessoa: require('../pessoas/pessoa.model'),
    Curso: require('../cursos/curso.model'),
    mongoose
};
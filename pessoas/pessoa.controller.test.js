const app = require('../server') 
const supertest = require('supertest')
const mongoose = require('mongoose');
const { cpf } = require('cpf-cnpj-validator');
const { Pessoa, Curso } = require('_helpers/db');

const request = supertest(app);
beforeAll(async () => {
    await mongoose.connection.collections['pessoas'].deleteMany();
    await mongoose.connection.collections['cursos'].deleteMany();
})

// afterEach
afterAll(async () => {
    await mongoose.connection.collections['pessoas'].deleteMany();
    await mongoose.connection.collections['cursos'].deleteMany();
})

describe('Testing the pessoa creation', () => {

    test('Creating pessoa with valid infos', async done => {

        let pessoaReceived = {
            cpf: cpf.generate(),
            nome: "Harry Potter",
            telefone: 34342727,
        }

        const response = await request.post('/pessoas/').send(pessoaReceived);
        
        expect(response.status).toBe(201);

        done();
    });

    test('Creating pessoa with duplicated cpf', async done => {

        let cpfDuplicated = cpf.generate();

        let pessoaReceived = {
            cpf: cpfDuplicated,
            nome: "Harry Potter",
            telefone: 34342727,
        }

        const pessoa = new Pessoa(pessoaReceived);
        await pessoa.save();

        const response = await request.post('/pessoas/').send(pessoaReceived);
        
        expect(response.status).toBe(409);

        done();
    });

})

describe('Testing the pessoa listing', () => {

    test('List all pessoas', async done => {

        const response = await request.get('/pessoas/');
        expect(response.status).toBe(200);

        done();
    });
})

describe('Testing the pessoa editing', () => {

    test('Change all properties', async done => {

        let cursoReceived = {
            nome: "Advanced A-Wing pilot"
        };

        const curso = new Curso(cursoReceived);
        await curso.save();

        let pessoaReceived = {
            cpf: cpf.generate(),
            nome: "Anakin Skywalker",
            telefone: 34342727,
            cursos: [
                curso
            ]
        }

        const pessoa = new Pessoa(pessoaReceived)
        await pessoa.save();

        let newCursoReceived = {
            nome: "Advanced X-Wing pilot"
        };

        const newCurso = new Curso(newCursoReceived);
        await newCurso.save();

        let pessoaReceived = {
            cpf: cpf.generate(),
            nome: "Darth Vader",
            telefone: 31312525,
            cursos: [
                newCurso
            ]
        }

        const response = await request.put('/pessoas/' + pessoa.id).send(pessoaReceived);
        expect(response.status).toBe(200);

        done();
    });
})

describe('Testing the pessoas deletion', () => {

    test('Deleting an existent pessoa', async done => {

        let pessoaReceived = {
            cpf: cpf.generate(),
            nome: "Harry Potter",
            telefone: 34342727,
        }

        const pessoa = new Pessoa(pessoaReceived);
        await pessoa.save();

        const response = await request.delete('/pessoas/' + pessoa.id);
        expect(response.status).toBe(200);
        done();
    });

    test('Deleting a non-existent pessoa', async done => {

        const response = await request.delete('/pessoas/' + 420);
      
        expect(response.status).toBe(404);
        done();
    });
})
const app = require('../server') 
const supertest = require('supertest')
const mongoose = require('mongoose');
const { cpf } = require('cpf-cnpj-validator');
const { Pessoa, Curso } = require('../_helpers/db');

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
        
        const response = await request.delete('/pessoas/' + '5d6ede6a0ba62570afcedd3a');
      
        expect(response.status).toBe(404);
        done();
    });
})

describe('Testing the pessoa editing', () => {
    test('Add curso', async done => {

        let pessoaReceived = {
            cpf: cpf.generate(),
            nome: "Anakin Skywalker",
            telefone: 34342727,
        }

        const pessoa = new Pessoa(pessoaReceived);
        await pessoa.save();

        let newCursoReceived = {
            _id: 332322,
            nome: "Advanced Death star pilot"
        };

        const newCurso = new Curso(newCursoReceived);
        await newCurso.save();

        pessoaReceived.cursos = [ newCurso.toObject() ];

        const response = await request.put('/pessoas/' + pessoa._id).send(pessoaReceived);
        expect(response.status).toBe(200);

        done();
    });
    test('Remove curso', async done => {

        let cursoToRemoveReceived = {
            _id: 332326,
            nome: "Advanced Death star pilot"
        };

        const cursoToRemove = new Curso(cursoToRemoveReceived);
        await cursoToRemove.save();

        let pessoaReceived = {
            cpf: cpf.generate(),
            nome: "Anakin Skywalker",
            telefone: 34342727,
            cursos: [ cursoToRemove.toObject() ]
        }

        const pessoa = new Pessoa(pessoaReceived);
        await pessoa.save();

        pessoaReceived.cursos = [];

        const response = await request.put('/pessoas/' + pessoa._id).send(pessoaReceived);
        expect(response.status).toBe(200);

        done();
    });
    test('Change curso', async done => {

        let cursoReceived = {
            _id: 323232,
            nome: "Advanced A-Wing pilot"
        };

        const curso = new Curso(cursoReceived);
        await curso.save();

        let curso2Received = {
            _id: 332323,
            nome: "Advanced X-Wing pilot"
        };

        const curso2 = new Curso(curso2Received);
        await curso2.save();

        let pessoaReceived = {
            cpf: cpf.generate(),
            nome: "Anakin Skywalker",
            telefone: 34342727,
            cursos: [
                curso.toObject(), curso2.toObject()
            ]
        }

        const pessoa = new Pessoa(pessoaReceived);
        await pessoa.save();

        let newCursoReceived = {
            _id: 332324,
            nome: "Advanced Death star pilot"
        };

        const newCurso = new Curso(newCursoReceived);
        await newCurso.save();

        pessoaReceived.cursos = [ newCurso.toObject() ];

        const response = await request.put('/pessoas/' + pessoa._id).send(pessoaReceived);
        expect(response.status).toBe(200);

        done();
    });
    test('Trying edit an inexistent pessoa', async done => {
        
        let pessoaReceived = {
            cpf: cpf.generate(),
            nome: "Anakin Skywalker",
            telefone: 34342727,
        }

        const response = await request.put('/pessoas/' + '5d6ede6a0ba62570afcedd3a').send(pessoaReceived);
      
        expect(response.status).toBe(404);
        done();
    });
})


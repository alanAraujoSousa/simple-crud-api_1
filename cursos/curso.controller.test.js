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

describe('Testing the curso creation', () => {

    test('Creating curso with valid infos', async done => {

        let cursoReceived = {
            _id: 523221,
            nome: "Advanced jedi's dark side"
        };

        const response = await request.post('/cursos/').send(cursoReceived);
        expect(response.status).toBe(201);

        done();
    });

})

describe('Testing the curso listing', () => {

    test('List all cursos', async done => {

        const response = await request.get('/cursos/');
        expect(response.status).toBe(200);

        done();
    });
})

describe('Testing the curso deletion', () => {

    test('Deleting an existent curso', async done => {

        let cursoReceived = {
            _id: 4930422,
            nome: "Basic defense against the dark arts",
        };

        const curso = new Curso(cursoReceived);
        await curso.save();

        const response = await request.delete('/cursos/' + curso.id);
        expect(response.status).toBe(200);
        done();
    });

    test('Deleting a non-existent curso', async done => {

        const response = await request.delete('/cursos/' + 420);
      
        expect(response.status).toBe(404);
        done();
    });

    test("Deleting a curso that's still associated with dependencies", async done => {

        let cursoReceived = {
            _id: 3233333,
            nome: "Advanced resistency to the ring power"
        };

        const curso = new Curso(cursoReceived);
        await curso.save();

        let pessoaReceived = {
            cpf: cpf.generate(),
            nome: "Frodo Baggins",
            telefone: 34342727,
            cursos: [
                curso
            ]
        }

        const pessoa = new Pessoa(pessoaReceived)
        await pessoa.save();

        const response = await request.delete('/cursos/' + curso.id);
        expect(response.status).toBe(400);
        done();
    });
})

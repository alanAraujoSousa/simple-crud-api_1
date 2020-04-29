const { Curso } = require('../_helpers/db');
const EntityNotFoundError = require('../_errors/entity-not-found.error');

module.exports = {
    create,
    list,
    findOne,
    update,
    _delete
};

async function create(userParam) {
    const curso = new Curso(userParam);
    await curso.save();
    return curso;
}

async function list() {
    let cursos = await Curso.find();
    return cursos;
}

async function findOne(id) {
    let pessoa = await Pessoa.findById(id);
    if (!pessoa) {
        throw new EntityNotFoundError("Pessoa");
    }
    
    return pessoa;
}

async function update(id, userParam) {
    let curso = await Curso.findByIdAndUpdate(id, userParam, { new: true });
    if (!curso) {
        throw new EntityNotFoundError("Curso");
    }

    return curso;
}

async function _delete(id) {
    let wasDeleted = await Curso.deleteOne({ _id: id });

    if (wasDeleted.n == 0) {
        throw new EntityNotFoundError("Curso");
    }

    if (wasDeleted.ok != 1) {
        throw new Error("The curso cannot be deleted!");
    }

    return wasDeleted;
}
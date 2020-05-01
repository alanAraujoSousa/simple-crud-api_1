const { Curso, Pessoa } = require('../_helpers/db');
const EntityNotFoundError = require('../_errors/entity-not-found.error');
const CursoInvalidDeletionError = require('../_errors/curso-invalid-deletion.error');

module.exports = {
    create,
    list,
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

async function update(id, userParam) {
    let curso = await Curso.findByIdAndUpdate(id, userParam, { new: true });
    if (!curso) {
        throw new EntityNotFoundError("Curso");
    }

    return curso;
}

async function _delete(id) {

    if (await Pessoa.exists({ cursos: id })) {
        throw new CursoInvalidDeletionError(id);
    }

    let curso = await Curso.findByIdAndDelete(id);
    
    if (!curso) {
        throw new EntityNotFoundError("Curso");
    }
}
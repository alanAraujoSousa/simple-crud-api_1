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

    if (await Pessoa.exists({ 'cursos._id': id })) {
        throw new CursoInvalidDeletionError(id);
    }

    let wasDeleted = await Curso.deleteOne({ _id: id });

    if (wasDeleted.n == 0) {
        throw new EntityNotFoundError("Curso");
    }

    if (wasDeleted.ok != 1) {
        throw new Error(`A system problem stuck the curso ${id} deletion, retry later!`);
    }

    return wasDeleted;
}
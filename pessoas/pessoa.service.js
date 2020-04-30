const { Pessoa, Curso } = require('../_helpers/db');
const CpfAlreadyExistsError = require('../_errors/cpf-already-exists.error');
const EntityNotFoundError = require('../_errors/entity-not-found.error');

module.exports = {
    create,
    list,
    findOne,
    update,
    _delete
};

async function create(userParam) {

    if (await Pessoa.exists({ cpf: userParam.cpf })) {
        throw new CpfAlreadyExistsError(); 
    }
    
    _checkCursoAssociation(userParam);

    const pessoa = new Pessoa(userParam);
    await pessoa.save();
    return pessoa;
}

async function list() {
    return await Pessoa.find();
}

async function findOne(id) {
    let pessoa = await Pessoa.findById(id).populate('cursos');
    if (!pessoa) {
        throw new EntityNotFoundError("Pessoa");
    }
    
    return pessoa;
}

async function update(id, userParam) {
    
    _checkCursoAssociation(userParam);

    let pessoa = await Pessoa.findByIdAndUpdate(id, userParam, { new: true });
    if (!pessoa) {
        throw new EntityNotFoundError("Pessoa");
    }

    return pessoa;
}

async function _delete(id) {
    let wasDeleted = await Pessoa.deleteOne({ _id: id });

    if (wasDeleted.n == 0) {
        throw new EntityNotFoundError("Pessoa");
    }

    if (wasDeleted.ok != 1) {
        throw new Error("The pessoa cannot be deleted!");
    }

    return wasDeleted;
}

function _checkCursoAssociation(userParam) {
    const cursos = userParam.cursos;

    if (cursos) {
        cursos.forEach(c => {
            if (!await Curso.exists({ _id: c._id || c.id })) {
                throw new EntityNotFoundError();
            }
        });
    }
}
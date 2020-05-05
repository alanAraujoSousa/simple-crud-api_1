const { Pessoa, Curso, mongoose } = require('../_helpers/db');
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
        throw new CpfAlreadyExistsError(userParam.cpf); 
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
    let pessoa = await Pessoa.findByIdAndDelete(id);
    
    if (!pessoa) {
        throw new EntityNotFoundError("Pessoa");
    }
}

async function _checkCursoAssociation(userParam) {
    let cursos = userParam.cursos;

    if (cursos) {
        for (let c of cursos) {
            if (!await Curso.exists({ _id: c._id || c.id })) {
                throw new EntityNotFoundError('Curso');
            }
        }
    }
}
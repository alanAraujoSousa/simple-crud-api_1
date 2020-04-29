import { Pessoa } from '_helpers/db';

export default {
    create,
    list,
    findOne,
    update,
    _delete
};

async function create(userParam) {
    const pessoa = new Pessoa(userParam);
    await pessoa.save();
    return pessoa;
}

async function list() {
    return await Pessoa.find();
}

async function findOne(id) {
    let pessoa = await Pessoa.findById(id);
    if (!pessoa) {
        throw new EntityNotFoundError("Pessoa");
    }
    
    return pessoa;
}

async function update(id, userParam) {
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
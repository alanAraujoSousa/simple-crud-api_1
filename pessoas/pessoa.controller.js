const { Router } = require('express');
const pessoaService =  require('./pessoa.service');

// routes
const router = Router();
router.post('/', create);
router.get('/', list);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    let content = req.body;
    pessoaService.create(content)
        .then(pessoaCreated => res.status(201).json(pessoaCreated))
        .catch(err => next(err));
}

function list(req, res, next) {    
    pessoaService.list()
        .then(pessoas => pessoas && pessoas.length > 0 ? res.json(pessoas) : res.json([]))
        .catch(err => next(err));
}

function findOne(req, res, next) {    
    pessoaService.findOne(req.params.id)
        .then(pessoa => res.json(pessoa))
        .catch(err => next(err));
}

function update(req, res, next) {
    pessoaService.update(req.params.id, req.body)
        .then(() => res.sendStatus(200))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    pessoaService._delete(req.params.id)
        .then(() => res.status(200).json(req.params.id))
        .catch(err => next(err));
}
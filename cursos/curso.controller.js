const { Router } = require('express');
const cursoService =  require('./curso.service');

// routes
const router = Router();
router.post('/', create);
router.get('/', list);
router.get('/:id', findOne);
router.put('/:id', update);
router.delete('/:id', _delete);

module.exports = router;

function create(req, res, next) {
    cursoService.create(req.body)
        .then(cursoCreated => res.status(201).json(cursoCreated))
        .catch(err => next(err));
}

function list(req, res, next) {    
    cursoService.list()
        .then(cursos => cursos && cursos.length > 0 ? res.json(cursos) : res.json([]))
        .catch(err => next(err));
}

function findOne(req, res, next) {    
    cursoService.findOne(req.params.id)
        .then(pessoa => res.json(pessoa))
        .catch(err => next(err));
}

function update(req, res, next) {
    cursoService.update(req.params.id, req.body)
        .then(res.sendStatus(200))
        .catch(err => next(err));
}

function _delete(req, res, next) {
    cursoService._delete(req.params.id)
        .then(res.sendStatus(200))
        .catch(err => next(err));
}
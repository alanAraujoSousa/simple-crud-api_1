const ApiError = require('./api.error');

class CursoInvalidDeletionError extends ApiError {
    constructor(id) {
        super(`The curso ${id} cannot be deleted, remove the associated pessoas`);
        this.httpCode = 400;
    }
}

module.exports = CursoInvalidDeletionError;

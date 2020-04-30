const ApiError = require('./api.error');

class CursoInvalidDeletionError extends ApiError {
    constructor(id) {
        super(`The curso ${id} cannot be deleted because your dependencies`);
        this.httpCode = 400;
    }
}

module.exports = CursoInvalidDeletionError;

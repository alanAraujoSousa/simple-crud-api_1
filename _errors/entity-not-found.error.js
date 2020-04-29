const ApiError = require('./api.error');

class EntityNotFoundError extends ApiError {
    constructor(entityType) {
        super(`The ${entityType} was not found`);
        this.httpCode = 404;
    }
}

module.exports = EntityNotFoundError;

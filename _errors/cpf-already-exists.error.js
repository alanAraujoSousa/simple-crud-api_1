const ApiError = require('./api.error');

class CpfAlreadyExistsError extends ApiError {
    constructor(cpf) {
        super(`The CPF ${cpf} already exists!`);
        this.httpCode = 409;
    }
}

module.exports = CpfAlreadyExistsError;
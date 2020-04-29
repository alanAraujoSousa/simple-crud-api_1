import ApiError from "./api.error"

export default class CpfAlreadyExistsError extends ApiError {
    constructor(cpf) {
        super(`The CPF ${cpf} already exists!`);
        this.httpCode = 409;
    }
}
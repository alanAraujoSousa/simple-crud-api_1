import ApiError from './api.error'

export default class EntityNotFoundError extends ApiError {
    constructor(entityType) {
        super(`The ${entityType} was not found`);
        this.httpCode = 404;
    }
}
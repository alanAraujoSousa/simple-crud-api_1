export default class ApiError extends Error {
    constructor(message) {
        super(message);
        this.name = this.constructor.name;
        this.httpCode = 500;
    }    
}
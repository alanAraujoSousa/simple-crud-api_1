const ApiError = require('../_errors/api.error')

module.exports = errorHandler;

function errorHandler(err, req, res, next) {

    // @TODO mongoose validation 
    if (err.name === 'ValidationError') { 
        return res.status(400).json({ message: err.message });
    }

    // My custom error handle
    if (err instanceof ApiError) {
        return res.status(err.httpCode).json({ message: err.message });
    }

    // default to 500 server error
    return res.status(500).json({ message: `Intern API error: ${err.message}` });
}

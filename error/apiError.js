const BaseError = require('./baseError');

class APIError extends BaseError {
  constructor(name,httpStatusCode,description,isOperational){
    super(name,httpStatusCode,description,isOperational)
  }
}

module.exports = APIError;
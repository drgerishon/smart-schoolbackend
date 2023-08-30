// Error codes for the app
const STATUS_CODES = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    CONFLICT: 409,
  };
  
  const ERROR_CODES = {
    BAD_REQUEST: "BAD_REQUEST",
    UNAUTHORIZED: "UNAUTHORIZED",
    FORBIDDEN: "FORBIDDEN",
    NOT_FOUND: "NOT_FOUND",
    INTERNAL_SERVER_ERROR: "INTERNAL_SERVER_ERROR",
    OK: "OK",
    CREATED: "CREATED",
    ACCEPTED: "ACCEPTED",
    NO_CONTENT: "NO_CONTENT",
    CONFLICT: "CONFLICT",
  };
  
  function createErrorObject(resultCode, description) {
    let jsonErrorResponse = {
      status: null,
      resultMessage: {
        en: description ?? null,
      },
      resultCode: resultCode ?? null,
    };
    if (resultCode === ERROR_CODES.OK) {
      jsonErrorResponse.status = "success";
    } else {
      jsonErrorResponse.status = "error";
    }
  
    return jsonErrorResponse;
  }
  
  function createResponseObject(resultCode, description) {
    let jsonErrorResponse = createErrorObject(resultCode, description);
    jsonErrorResponse.status = "success";
    return jsonErrorResponse;
  }
  
  class AppError extends Error {
    constructor(name, statusCode, description) {
      super(description);
      Object.setPrototypeOf(this, new.target.prototype); // this is to set the prototype of the AppError class to the prototype of the Error class eg. AppError.prototype = Error.prototype
      this.name = name;
      this.statusCode = statusCode;
      this.description = description;
      Error.captureStackTrace(this); // this is to capture the stack trace of the error eg. the line number and file where the error occurred
    }
  }
  
  class BadRequestError extends AppError {
    constructor(description) {
      super(ERROR_CODES.BAD_REQUEST, STATUS_CODES.BAD_REQUEST, description);
    }
  }
  
  class UnauthorizedError extends AppError {
    constructor(description) {
      super(ERROR_CODES.UNAUTHORIZED, STATUS_CODES.UNAUTHORIZED, description);
    }
  }
  
  class ForbiddenError extends AppError {
    constructor(description) {
      super(ERROR_CODES.FORBIDDEN, STATUS_CODES.FORBIDDEN, description);
    }
  }
  
  class NotFoundError extends AppError {
    constructor(description) {
      super(ERROR_CODES.NOT_FOUND, STATUS_CODES.NOT_FOUND, description);
    }
  }
  
  class InternalServerError extends AppError {
    constructor(description) {
      super(ERROR_CODES.INTERNAL_SERVER_ERROR, STATUS_CODES.INTERNAL_SERVER_ERROR, description);
    }
  }
  
  class OK extends AppError {
    constructor(description) {
      super(ERROR_CODES.OK, STATUS_CODES.OK, description);
    }
  }
  
  class Created extends AppError {
    constructor(description) {
      super(ERROR_CODES.CREATED, STATUS_CODES.CREATED, description);
    }
  }
  
  class Accepted extends AppError {
    constructor(description) {
      super(ERROR_CODES.ACCEPTED, STATUS_CODES.ACCEPTED, description);
    }
  }
  
  class NoContent extends AppError {
    constructor(description) {
      super(ERROR_CODES.NO_CONTENT, STATUS_CODES.NO_CONTENT, description);
    }
  }
  
  class Conflict extends AppError {
    constructor(description) {
      super(ERROR_CODES.CONFLICT, STATUS_CODES.CONFLICT, description);
    }
  }
  
  module.exports = {
    AppError,
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    InternalServerError,
    OK,
    Created,
    Accepted,
    NoContent,
    Conflict,
    createErrorObject,
    ERROR_CODES,
    createResponseObject,
  };
  
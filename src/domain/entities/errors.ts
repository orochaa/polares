export class BaseError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'BaseError'
  }
}

export class InternalServerError extends BaseError {
  constructor() {
    super('Internal server error')
    this.name = 'InternalServerError'
  }
}

export class MissingParamError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'MissingParamError'
  }
}

export class InvalidParamError extends BaseError {
  constructor(message: string) {
    super(message)
    this.name = 'InvalidParamError'
  }
}

import { InvalidParamError } from './domain/entities/errors.js'

export class Router {
  readonly actions: Map<string, Handler>

  constructor() {
    this.actions = new Map()
  }

  register(action: string, handler: Handler): void {
    action = action.toUpperCase()

    if (this.actions.has(action)) {
      throw new Error(`Duplicated action received: ${action}`)
    }

    this.actions.set(action, handler)
  }

  async handle(
    action: string,
    message: string,
    reply: (response: string) => void
  ): Promise<void> {
    const handler = this.actions.get(action.toUpperCase())

    if (!handler) {
      throw new InvalidParamError('Invalid action received')
    }

    return handler.handle(message, reply)
  }
}

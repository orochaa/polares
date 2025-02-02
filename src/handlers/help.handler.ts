import type { Router } from '@/router.js'

export class HelpHandler implements Handler {
  readonly description = 'List all available actions'
  readonly example = 'Help'

  handle(
    this: Router,
    message: string,
    reply: (response: string) => void
  ): void {
    for (const [action, handler] of this.actions) {
      reply(
        [
          `**${action}**`,
          `description: ${handler.description}`,
          `example:`,
          handler.example,
        ].join('\n')
      )
    }
  }
}

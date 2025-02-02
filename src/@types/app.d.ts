interface Handler {
  description: string
  example: string

  handle(
    message: string,
    reply: (response: string) => void
  ): void | Promise<void>
}

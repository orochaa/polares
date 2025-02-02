interface Handler {
  handle(message: string, reply: (response: string) => void): Promise<void>
}

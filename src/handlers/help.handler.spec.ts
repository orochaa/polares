import type { Router } from '@/router.js'
import { HelpHandler } from './help.handler.js'

const makeSut = () => new HelpHandler()

describe('HelpHandler', () => {
  it('should create an Other category', async () => {
    const sut = makeSut()

    const actions = new Map<string, Handler>()
    actions.set('buy', new HelpHandler())

    let counter = 0
    await sut.handle.bind({ actions } as unknown as Router)('Help', () => {
      counter++
    })

    expect(counter).toBe(1)
  })
})

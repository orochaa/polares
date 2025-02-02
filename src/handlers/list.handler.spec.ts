import type { TransactionRepository } from '@/infra/transaction.repository.js'
import { ListHandler } from './list.handler.js'
import { InvalidParamError } from '@/domain/entities/errors.js'

const makeSut = () =>
  new ListHandler({
    listLatestRecords: vi.fn(() => []),
  } as unknown as TransactionRepository)

describe('ListHandler', () => {
  it('should throw on invalid date', async () => {
    const sut = makeSut()

    const promise = sut.handle(['List', 'invalid-date'].join('\n'), () => {})

    await expect(promise).rejects.toThrow(InvalidParamError)
  })

  it('should list with default value', async () => {
    const sut = makeSut()

    await sut.handle(['List'].join('\n'), () => {})

    expect(sut.transactionRepository.listLatestRecords).toHaveBeenCalledWith(
      expect.any(Date)
    )
  })

  it('should list with given days ago', async () => {
    const sut = makeSut()

    await sut.handle(['List', '1'].join('\n'), () => {})

    expect(sut.transactionRepository.listLatestRecords).toHaveBeenCalledWith(
      expect.any(Date)
    )
  })
})

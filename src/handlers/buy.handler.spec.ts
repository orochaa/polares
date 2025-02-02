import type { CategoryRepository } from '@/infra/category.repository.js'
import { BuyHandler } from './buy.handler.js'
import type { TransactionRepository } from '@/infra/transaction.repository.js'
import { Category } from '@/domain/entities/category.js'
import { mockCategory } from '@/tests/mocks.js'

const makeSut = (): BuyHandler => {
  return new BuyHandler(
    {
      findByName: vi.fn(),
      create: vi.fn(),
    } as unknown as CategoryRepository,
    {
      create: vi.fn(),
    } as unknown as TransactionRepository
  )
}

describe('BuyHandler', () => {
  it('should create an Other category', async () => {
    const sut = makeSut()

    await sut.handle(['Buy', '25'].join('\n'), () => {})

    expect(sut.categoryRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        name: 'Other',
      })
    )
  })

  it('should create a transaction with Other category', async () => {
    const sut = makeSut()
    const category = mockCategory()
    vi.spyOn(Category, 'create').mockReturnValueOnce(category)

    await sut.handle(['Buy', '25'].join('\n'), () => {})

    expect(sut.categoryRepository.create).toHaveBeenCalledWith(category)
    expect(sut.transactionRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryId: category.id,
        value: 25,
      })
    )
  })

  it('should create a transaction with defined category', async () => {
    const sut = makeSut()
    const category = mockCategory()
    vi.mocked(sut.categoryRepository.findByName).mockResolvedValueOnce(category)

    await sut.handle(['Buy', '25', '', 'Tech'].join('\n'), () => {})

    expect(sut.categoryRepository.findByName).toHaveBeenCalledWith('Tech')
    expect(sut.categoryRepository.create).not.toHaveBeenCalled()
    expect(sut.transactionRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryId: category.id,
        value: 25,
      })
    )
  })

  it('should create a transaction with description and Other category', async () => {
    const sut = makeSut()
    const category = mockCategory()
    vi.mocked(sut.categoryRepository.findByName).mockResolvedValueOnce(category)

    await sut.handle(['Buy', '25', 'Foo'].join('\n'), () => {})

    expect(sut.categoryRepository.findByName).toHaveBeenCalledWith('Other')
    expect(sut.categoryRepository.create).not.toHaveBeenCalled()
    expect(sut.transactionRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryId: category.id,
        description: 'Foo',
        value: 25,
      })
    )
  })

  it('should create a transaction with description and defined category', async () => {
    const sut = makeSut()
    const category = mockCategory()
    vi.mocked(sut.categoryRepository.findByName).mockResolvedValueOnce(category)

    await sut.handle(['Buy', '25', 'Foo', 'Tech'].join('\n'), () => {})

    expect(sut.categoryRepository.findByName).toHaveBeenCalledWith('Tech')
    expect(sut.categoryRepository.create).not.toHaveBeenCalled()
    expect(sut.transactionRepository.create).toHaveBeenCalledWith(
      expect.objectContaining({
        categoryId: category.id,
        description: 'Foo',
        value: 25,
      })
    )
  })
})

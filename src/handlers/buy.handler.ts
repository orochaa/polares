import { Category } from '@/domain/entities/category.js'
import { Transaction } from '@/domain/entities/transaction.js'
import type { CategoryRepository } from '@/infra/category.repository.js'
import type { TransactionRepository } from '@/infra/transaction.repository.js'

export class BuyHandler implements Handler {
  readonly description = 'Register a buy action'
  readonly example = [
    'Buy',
    '25 (price)',
    'Dinner from IFood (description)',
    'Food (category)',
  ].join('\n')

  constructor(
    readonly categoryRepository: CategoryRepository,
    readonly transactionRepository: TransactionRepository
  ) {}

  async handle(
    message: string,
    reply: (response: string) => void
  ): Promise<void> {
    const [, value, description = '', categoryName = 'Other'] =
      message.split('\n')

    let category = await this.categoryRepository.findByName(categoryName)

    if (!category) {
      category = Category.create({
        name: categoryName,
      })
      await this.categoryRepository.create(category)
      reply('New category registered')
    }

    const transaction = Transaction.createBuy({
      categoryId: category.id,
      description,
      value,
    })
    await this.transactionRepository.create(transaction)

    reply('New transaction registered')
  }
}

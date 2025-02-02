import { InvalidParamError } from '@/domain/entities/errors.js'
import type { TransactionRepository } from '@/infra/transaction.repository.js'

export class ListHandler implements Handler {
  constructor(readonly transactionRepository: TransactionRepository) {}

  description = 'List the last transactions'
  example = ['List', '15 (from N days ago)'].join('\n')

  async handle(
    message: string,
    reply: (response: string) => void
  ): Promise<void> {
    const [, daysAgoStr = '0'] = message.split('\n')
    const daysAgo = Number(daysAgoStr)

    if (Number.isNaN(daysAgo)) {
      throw new InvalidParamError('Invalid date received')
    }

    const date = new Date()
    date.setDate(-daysAgo)

    const transactions =
      await this.transactionRepository.listLatestRecords(date)

    for (const transaction of transactions) {
      reply(
        [
          `**${transaction.type} - ${transaction.category?.name}**`,
          transaction.description,
          transaction.currencyValue,
        ]
          .filter(Boolean)
          .join('\n')
      )
    }
  }
}

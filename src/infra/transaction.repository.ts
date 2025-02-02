import type { Transaction } from '@/domain/entities/transaction.js'
import type { PrismaClient } from '@prisma/client'
import { TransactionMapper } from './mappers/transaction.mapper.js'

export class TransactionRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: Transaction): Promise<void> {
    await this.db.transaction.create({
      data: TransactionMapper.toPrisma(data),
    })
  }

  async listLatestRecords(date: Date): Promise<Transaction[]> {
    const data = await this.db.transaction.findMany({
      where: {
        createdAt: {
          lte: date,
        },
      },
      include: {
        category: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return TransactionMapper.mapToDomain(data)
  }
}

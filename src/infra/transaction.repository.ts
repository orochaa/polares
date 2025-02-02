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
}

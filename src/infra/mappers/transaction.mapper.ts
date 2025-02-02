import { Transaction } from '@/domain/entities/transaction.js'
import type { Transaction as TransactionPrisma } from '@prisma/client'

export const TransactionMapper = {
  toPrisma(data: Transaction): TransactionPrisma {
    return {
      id: data.id,
      categoryId: data.categoryId,
      type: data.type,
      value: data.value,
      description: data.description,
      createdAt: data.createdAt,
    }
  },

  toDomain(data: TransactionPrisma): Transaction {
    return new Transaction(data)
  },
}

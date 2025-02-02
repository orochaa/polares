import { Category } from '@/domain/entities/category.js'
import { Transaction } from '@/domain/entities/transaction.js'

export function mockCategory(): Category {
  return new Category({
    id: '56d2e968-2407-4d51-ad8d-ebdbda1ef031',
    name: 'Other',
    createdAt: new Date(),
  })
}

export function mockTransaction(type: string): Transaction {
  return new Transaction({
    id: '05f34a2f-5ce5-4dab-a3ff-768add8ff343',
    categoryId: '56d2e968-2407-4d51-ad8d-ebdbda1ef031',
    type: type,
    value: 25,
    description: '',
    createdAt: new Date(),
  })
}

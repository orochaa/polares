import { Category } from '@/domain/entities/category.js'
import type { Category as CategoryPrisma } from '@prisma/client'

export const CategoryMapper = {
  toPrisma(data: Category): CategoryPrisma {
    return {
      id: data.id,
      name: data.name,
      createdAt: data.createdAt,
    }
  },

  toDomain(data: CategoryPrisma): Category {
    return new Category(data)
  },
}

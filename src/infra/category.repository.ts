import type { Category } from '@/domain/entities/category.js'
import type { PrismaClient } from '@prisma/client'
import { CategoryMapper } from './mappers/category.mapper.js'

export class CategoryRepository {
  constructor(private readonly db: PrismaClient) {}

  async create(data: Category): Promise<void> {
    await this.db.category.create({
      data: CategoryMapper.toPrisma(data),
    })
  }

  async findByName(name: string): Promise<Category | null> {
    const data = await this.db.category.findUnique({
      where: {
        name,
      },
    })

    return data && CategoryMapper.toDomain(data)
  }
}

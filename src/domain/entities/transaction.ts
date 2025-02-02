import { randomUUID } from 'node:crypto'
import { InvalidParamError } from './errors.js'
import { Category } from './category.js'

export class Transaction {
  private readonly props: Transaction.Props

  constructor(params: Transaction.Params) {
    const type = params.type.toUpperCase()
    const value = Number(params.value)

    if (type !== 'BUY' && type !== 'SELL') {
      throw new InvalidParamError('Invalid transaction type received')
    }

    if (Number.isNaN(value)) {
      throw new InvalidParamError('Invalid value received')
    }

    this.props = {
      id: params.id,
      categoryId: params.categoryId,
      type: type,
      value: value,
      description: params.description,
      createdAt: new Date(params.createdAt),

      category: params.category && new Category(params.category),
    }
  }

  get id(): string {
    return this.props.id
  }

  get categoryId(): string {
    return this.props.categoryId
  }

  get type(): string {
    return this.props.type
  }

  get value(): number {
    return this.props.value
  }

  get currencyValue(): string {
    return this.props.value.toLocaleString(undefined, {
      currency: 'USD',
      minimumFractionDigits: 2,
    })
  }

  get description(): string {
    return this.props.description
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  get category(): Category | undefined {
    return this.props.category
  }

  static create(params: Transaction.CreateParams): Transaction {
    return new Transaction({
      id: randomUUID(),
      categoryId: params.categoryId,
      type: params.type,
      value: params.value,
      description: params.description,
      createdAt: new Date(),
    })
  }

  static createBuy(
    params: Omit<Transaction.CreateParams, 'type'>
  ): Transaction {
    return this.create({ ...params, type: 'BUY' })
  }

  static createSell(
    params: Omit<Transaction.CreateParams, 'type'>
  ): Transaction {
    return this.create({ ...params, type: 'SELL' })
  }
}

export namespace Transaction {
  export interface Props {
    id: string
    categoryId: string
    type: string
    value: number
    description: string
    createdAt: Date

    category: Category | undefined
  }

  export interface Params {
    id: string
    categoryId: string
    type: string
    value: string | number
    description: string
    createdAt: Date | string

    category?: Category.Params
  }

  export interface CreateParams {
    categoryId: string
    type: string
    value: string | number
    description: string
  }
}

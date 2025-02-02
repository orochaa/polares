import { randomUUID } from 'node:crypto'

export class Category {
  private readonly props: Category.Props

  constructor(params: Category.Params) {
    this.props = {
      id: params.id,
      name: params.name,
      createdAt: new Date(params.createdAt),
    }
  }

  get id(): string {
    return this.props.id
  }

  get name(): string {
    return this.props.name
  }

  get createdAt(): Date {
    return this.props.createdAt
  }

  static create(params: Category.CreateParams): Category {
    return new Category({
      id: randomUUID(),
      name: params.name,
      createdAt: new Date(),
    })
  }
}

export namespace Category {
  export interface Props {
    id: string
    name: string
    createdAt: Date
  }

  export interface Params {
    id: string
    name: string
    createdAt: Date | string
  }

  export interface CreateParams {
    name: string
  }
}

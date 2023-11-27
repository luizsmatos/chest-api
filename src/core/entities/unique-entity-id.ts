import { randomUUID } from 'node:crypto'

export class UniqueEntityID {
  private readonly _value: string

  toString(): string {
    return this._value
  }

  toValue(): string {
    return this._value
  }

  private constructor(value: string) {
    this._value = value
  }

  public static create(id?: string): UniqueEntityID {
    return new UniqueEntityID(id ?? randomUUID())
  }

  public equals(id?: UniqueEntityID): boolean {
    if (id == null) {
      return false
    }

    return id.toValue() === this._value
  }
}

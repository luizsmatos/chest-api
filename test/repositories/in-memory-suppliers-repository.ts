import { Supplier } from '@/domain/suppliers/entities/supplier'
import { SuppliersRepository } from '@/domain/suppliers/repositories/suppliers-repository'

export class InMemorySuppliersRepository implements SuppliersRepository {
  public items: Supplier[] = []

  async findById(id: string): Promise<Supplier | null> {
    const supplier = this.items.find((item) => item.id.toString() === id)

    if (!supplier) {
      return null
    }

    return supplier
  }

  async findMany(): Promise<Supplier[]> {
    return this.items
  }

  async create(supplier: Supplier): Promise<void> {
    this.items.push(supplier)
  }

  async save(supplier: Supplier): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === supplier.id)

    this.items[itemIndex] = supplier
  }

  async delete(supplier: Supplier): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === supplier.id)

    this.items.splice(itemIndex, 1)
  }
}

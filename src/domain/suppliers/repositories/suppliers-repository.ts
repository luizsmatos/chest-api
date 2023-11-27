import { Supplier } from '../entities/supplier'

export abstract class SuppliersRepository {
  abstract findById(id: string): Promise<Supplier | null>
  abstract findMany(): Promise<Supplier[]>
  abstract create(supplier: Supplier): Promise<void>
  abstract save(supplier: Supplier): Promise<void>
  abstract delete(supplier: Supplier): Promise<void>
}

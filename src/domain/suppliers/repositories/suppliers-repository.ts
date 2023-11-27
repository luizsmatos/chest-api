import { Supplier } from '../entities/supplier'

export abstract class SuppliersRepository {
  abstract create(supplier: Supplier): Promise<void>
  abstract findById(id: string): Promise<Supplier | null>
  abstract save(supplier: Supplier): Promise<void>
}

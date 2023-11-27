import { InMemorySuppliersRepository } from 'test/repositories/in-memory-suppliers-repository'
import { makeSupplier } from 'test/factories/make-supplier'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { DeleteSupplierUseCase } from './delete-supplier'

let inMemorySuppliersRepository: InMemorySuppliersRepository
let deleteSupplierUseCase: DeleteSupplierUseCase

describe('Delete Supplier', () => {
  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    deleteSupplierUseCase = new DeleteSupplierUseCase(
      inMemorySuppliersRepository,
    )
  })

  it('should be able to delete a supplier', async () => {
    const newSupplier = makeSupplier({}, UniqueEntityID.create('supplier-1'))

    await inMemorySuppliersRepository.create(newSupplier)

    await deleteSupplierUseCase.execute({
      supplierId: newSupplier.id.toValue(),
    })

    expect(inMemorySuppliersRepository.items).toHaveLength(0)
  })

  it('should not be able to delete a supplier if it does not exists', async () => {
    const result = await deleteSupplierUseCase.execute({
      supplierId: 'invalid_id',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

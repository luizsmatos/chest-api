import { InMemorySuppliersRepository } from 'test/repositories/in-memory-suppliers-repository'
import { makeSupplier } from 'test/factories/make-supplier'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { EditSupplierUseCase } from './edit-supplier'

let inMemorySuppliersRepository: InMemorySuppliersRepository
let editSupplierUseCase: EditSupplierUseCase

describe('Edit Supplier', () => {
  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    editSupplierUseCase = new EditSupplierUseCase(inMemorySuppliersRepository)
  })

  it('should be able to edit a supplier', async () => {
    const newSupplier = makeSupplier({}, UniqueEntityID.create('supplier-1'))

    await inMemorySuppliersRepository.create(newSupplier)

    await editSupplierUseCase.execute({
      supplierId: newSupplier.id.toValue(),
      name: 'any_name',
      email: 'any_email',
      phone: 'any_phone',
      address: 'any_address',
    })

    expect(inMemorySuppliersRepository.items[0]).toMatchObject({
      name: 'any_name',
      email: 'any_email',
      phone: 'any_phone',
      address: 'any_address',
    })
  })

  it('should not be able to edit a supplier if it does not exists', async () => {
    const result = await editSupplierUseCase.execute({
      supplierId: 'invalid_id',
      name: 'any_name',
      email: 'any_email',
      phone: 'any_phone',
      address: 'any_address',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

import { InMemorySuppliersRepository } from 'test/repositories/in-memory-suppliers-repository'

import { CreateSupplierUseCase } from './create-supplier'

let inMemorySuppliersRepository: InMemorySuppliersRepository
let createSupplierUseCase: CreateSupplierUseCase

describe('Create Supplier', () => {
  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    createSupplierUseCase = new CreateSupplierUseCase(
      inMemorySuppliersRepository,
    )
  })

  it('should be able to create a new supplier', async () => {
    const result = await createSupplierUseCase.execute({
      name: 'any_name',
      email: 'any_email',
      phone: 'any_phone',
      address: 'any_address',
    })

    expect(result.isRight()).toBeTruthy()
    expect(inMemorySuppliersRepository.items.length).toBe(1)
    expect(inMemorySuppliersRepository.items[0]).toEqual(result.value?.supplier)
  })
})

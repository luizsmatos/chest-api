import { InMemorySuppliersRepository } from 'test/repositories/in-memory-suppliers-repository'

import { FetchSuppliersUseCase } from './fetch-suppliers'
import { makeSupplier } from 'test/factories/make-supplier'

let inMemorySuppliersRepository: InMemorySuppliersRepository
let fetchSuppliersUseCase: FetchSuppliersUseCase

describe('Fetch Supplier', () => {
  beforeEach(() => {
    inMemorySuppliersRepository = new InMemorySuppliersRepository()
    fetchSuppliersUseCase = new FetchSuppliersUseCase(
      inMemorySuppliersRepository,
    )
  })

  it('should be able to fetch suppliers', async () => {
    await inMemorySuppliersRepository.create(makeSupplier())
    await inMemorySuppliersRepository.create(makeSupplier())

    const result = await fetchSuppliersUseCase.execute()

    expect(result.isRight()).toBeTruthy()
    expect(result.value?.suppliers).toHaveLength(2)
  })
})

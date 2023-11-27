import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/errors/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { SuppliersRepository } from '../repositories/suppliers-repository'

type DeleteSupplierUseCaseRequest = {
  supplierId: string
}

type DeleteSupplierUseCaseResponse = Either<ResourceNotFoundError, null>

@Injectable()
export class DeleteSupplierUseCase {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute({
    supplierId,
  }: DeleteSupplierUseCaseRequest): Promise<DeleteSupplierUseCaseResponse> {
    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      return left(new ResourceNotFoundError())
    }

    await this.suppliersRepository.delete(supplier)

    return right(null)
  }
}

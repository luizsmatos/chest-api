import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/errors/either'

import { Supplier } from '../entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers-repository'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

type EditSupplierUseCaseRequest = {
  supplierId: string
  name: string
  email: string
  phone: string
  address: string
}

type EditSupplierUseCaseResponse = Either<
  ResourceNotFoundError,
  { supplier: Supplier }
>

@Injectable()
export class EditSupplierUseCase {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute({
    supplierId,
    name,
    email,
    address,
    phone,
  }: EditSupplierUseCaseRequest): Promise<EditSupplierUseCaseResponse> {
    const supplier = await this.suppliersRepository.findById(supplierId)

    if (!supplier) {
      return left(new ResourceNotFoundError())
    }

    supplier.name = name
    supplier.email = email
    supplier.address = address
    supplier.phone = phone

    await this.suppliersRepository.save(supplier)

    return right({
      supplier,
    })
  }
}

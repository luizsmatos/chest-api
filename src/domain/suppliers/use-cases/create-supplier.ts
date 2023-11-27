import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/errors/either'

import { Supplier } from '../entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers-repository'

type CreateSupplierUseCaseRequest = {
  name: string
  email: string
  phone: string
  address: string
}

type CreateSupplierUseCaseResponse = Either<null, { supplier: Supplier }>

@Injectable()
export class CreateSupplierUseCase {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute({
    name,
    email,
    address,
    phone,
  }: CreateSupplierUseCaseRequest): Promise<CreateSupplierUseCaseResponse> {
    const supplier = Supplier.create({
      name,
      email,
      address,
      phone,
    })

    await this.suppliersRepository.create(supplier)

    return right({
      supplier,
    })
  }
}

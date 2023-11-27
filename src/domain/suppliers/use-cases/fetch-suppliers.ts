import { Injectable } from '@nestjs/common'

import { Either, right } from '@/core/errors/either'

import { Supplier } from '../entities/supplier'
import { SuppliersRepository } from '../repositories/suppliers-repository'

type FetchSuppliersUseCaseResponse = Either<null, { suppliers: Supplier[] }>

@Injectable()
export class FetchSuppliersUseCase {
  constructor(private suppliersRepository: SuppliersRepository) {}

  async execute(): Promise<FetchSuppliersUseCaseResponse> {
    const suppliers = await this.suppliersRepository.findMany()

    return right({
      suppliers,
    })
  }
}

import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/errors/either'
import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'
import { UsersRepository } from '../repositories/users-repository'
import { User } from '../entities/user'
import { HashGenerator } from '../cryptography/hash-generator'

type EditUserUseCaseRequest = {
  userId: string
  name: string
  email: string
  password: string
}

type EditUserUseCaseResponse = Either<ResourceNotFoundError, { user: User }>

@Injectable()
export class EditUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    userId,
    name,
    email,
    password,
  }: EditUserUseCaseRequest): Promise<EditUserUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)

    if (!user) {
      return left(new ResourceNotFoundError())
    }

    user.name = name
    user.email = email

    const hashedPassword = await this.hashGenerator.hash(password)
    user.password = hashedPassword

    await this.usersRepository.save(user)

    return right({
      user,
    })
  }
}

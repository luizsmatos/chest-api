import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/errors/either'
import { UsersRepository } from '../repositories/users-repository'
import { User } from '../entities/user'

import { UserAlreadyExistsError } from './erros/user-already-exists-error'
import { HashGenerator } from '../cryptography/hash-generator'

type RegisterUserRequest = {
  name: string
  email: string
  password: string
}

type RegisterUserResponse = Either<UserAlreadyExistsError, { user: User }>

@Injectable()
export class RegisterUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private hashGenerator: HashGenerator,
  ) {}

  async execute({
    name,
    email,
    password,
  }: RegisterUserRequest): Promise<RegisterUserResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      return left(new UserAlreadyExistsError(email))
    }

    const hashedPassword = await this.hashGenerator.hash(password)

    const user = User.create({
      name,
      email,
      password: hashedPassword,
    })

    await this.usersRepository.create(user)

    return right({
      user,
    })
  }
}

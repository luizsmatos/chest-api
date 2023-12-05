import { Injectable } from '@nestjs/common'

import { Either, left, right } from '@/core/errors/either'
import { UsersRepository } from '../repositories/users-repository'

import { WrongCredentialsError } from './erros/wrong-credentials-error'
import { Encrypter } from '../cryptography/encrypter'

type AuthenticateUserUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUserUseCaseResponse = Either<
  WrongCredentialsError,
  { accessToken: string }
>

@Injectable()
export class AuthenticateUserUseCase {
  constructor(
    private usersRepository: UsersRepository,
    private encrypter: Encrypter,
  ) {}

  async execute({
    email,
    password,
  }: AuthenticateUserUseCaseRequest): Promise<AuthenticateUserUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      return left(new WrongCredentialsError())
    }

    const isPasswordValid = password === user.password

    if (!isPasswordValid) {
      return left(new WrongCredentialsError())
    }

    const accessToken = await this.encrypter.encrypt({ id: user.id.toString() })

    return right({
      accessToken,
    })
  }
}

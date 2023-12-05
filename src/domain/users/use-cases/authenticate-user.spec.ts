import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakerEncrypter } from 'test/cryptography/faker-encrypter'

import { AuthenticateUserUseCase } from './authenticate-user'
import { makeUser } from 'test/factories/make-user'
import { WrongCredentialsError } from './erros/wrong-credentials-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let authenticateUserUseCase: AuthenticateUserUseCase
let fakerEncrypter: FakerEncrypter

describe('Authenticate User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakerEncrypter = new FakerEncrypter()

    authenticateUserUseCase = new AuthenticateUserUseCase(
      inMemoryUsersRepository,
      fakerEncrypter,
    )
  })

  it('should be able to authenticate a user', async () => {
    const createdUser = makeUser()

    inMemoryUsersRepository.items.push(createdUser)

    const result = await authenticateUserUseCase.execute({
      email: createdUser.email,
      password: createdUser.password,
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({ accessToken: expect.any(String) })
  })

  it('should not be able to authenticate a user with wrong email', async () => {
    const createdUser = makeUser()

    inMemoryUsersRepository.items.push(createdUser)

    const result = await authenticateUserUseCase.execute({
      email: 'wrong-email',
      password: createdUser.password,
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })

  it('should not be able to authenticate a user with wrong password', async () => {
    const createdUser = makeUser()

    inMemoryUsersRepository.items.push(createdUser)

    const result = await authenticateUserUseCase.execute({
      email: createdUser.email,
      password: 'wrong-password',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(WrongCredentialsError)
  })
})

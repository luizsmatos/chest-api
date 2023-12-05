import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakeHasher } from 'test/cryptography/faker-hasher'
import { makeUser } from 'test/factories/make-user'

import { RegisterUserUseCase } from './register-user'
import { UserAlreadyExistsError } from './erros/user-already-exists-error'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakerHasher: FakeHasher
let registerUserUseCase: RegisterUserUseCase

describe('Register User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakerHasher = new FakeHasher()

    registerUserUseCase = new RegisterUserUseCase(
      inMemoryUsersRepository,
      fakerHasher,
    )
  })

  it('should be able to register a user', async () => {
    const result = await registerUserUseCase.execute({
      name: 'any-name',
      email: 'any-email',
      password: 'any-password',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
  })

  it('should not be able to register a user with same email', async () => {
    const createdUser = makeUser()

    inMemoryUsersRepository.items.push(createdUser)

    const result = await registerUserUseCase.execute({
      name: 'any-name',
      email: createdUser.email,
      password: 'any-password',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(UserAlreadyExistsError)
  })
})

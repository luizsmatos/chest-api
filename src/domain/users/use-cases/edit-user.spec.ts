import { InMemoryUsersRepository } from 'test/repositories/in-memory-users-repository'
import { FakeHasher } from 'test/cryptography/faker-hasher'
import { makeUser } from 'test/factories/make-user'

import { ResourceNotFoundError } from '@/core/errors/resource-not-found-error'

import { EditUserUseCase } from './edit-user'

let inMemoryUsersRepository: InMemoryUsersRepository
let fakerHasher: FakeHasher
let editUserUseCase: EditUserUseCase

describe('Edit User', () => {
  beforeEach(() => {
    inMemoryUsersRepository = new InMemoryUsersRepository()
    fakerHasher = new FakeHasher()

    editUserUseCase = new EditUserUseCase(inMemoryUsersRepository, fakerHasher)
  })

  it('should be able to edit a user', async () => {
    const createdUser = makeUser()

    inMemoryUsersRepository.items.push(createdUser)

    const result = await editUserUseCase.execute({
      userId: createdUser.id.toString(),
      name: 'any-name',
      email: 'any-email',
      password: 'any-password',
    })

    expect(result.isRight()).toBeTruthy()
    expect(result.value).toEqual({
      user: inMemoryUsersRepository.items[0],
    })
  })

  it('should not be able to edit a user if user does not exists', async () => {
    const result = await editUserUseCase.execute({
      userId: 'user-not-exists',
      name: 'any-name',
      email: 'any-email',
      password: 'any-password',
    })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})

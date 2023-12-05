import { faker } from '@faker-js/faker'

import { User, UserProps } from '@/domain/users/entities/user'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeUser(
  override: Partial<UserProps> = {},
  id?: UniqueEntityID,
) {
  return User.create(
    {
      name: faker.company.name(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      ...override,
    },
    id,
  )
}

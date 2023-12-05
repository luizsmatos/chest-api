import { faker } from '@faker-js/faker'

import { Company, CompanyProps } from '@/domain/companies/entities/company'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeCompany(
  override: Partial<CompanyProps> = {},
  id?: UniqueEntityID,
) {
  return Company.create(
    {
      name: faker.company.name(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      address: faker.location.streetAddress(),
      ...override,
    },
    id,
  )
}

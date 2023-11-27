import { faker } from '@faker-js/faker'

import { Supplier, SupplierProps } from '@/domain/suppliers/entities/supplier'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'

export function makeSupplier(
  override: Partial<SupplierProps> = {},
  id?: UniqueEntityID,
) {
  return Supplier.create(
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

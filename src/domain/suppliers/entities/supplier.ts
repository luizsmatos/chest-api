import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface SupplierProps {
  name: string
  email: string
  phone: string
  address: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Supplier extends Entity<SupplierProps> {
  get name() {
    return this.props.name
  }

  set name(name: string) {
    this.props.name = name
    this.touch()
  }

  get email() {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
    this.touch()
  }

  get phone() {
    return this.props.phone
  }

  set phone(phone: string) {
    this.props.phone = phone
    this.touch()
  }

  get address() {
    return this.props.address
  }

  set address(address: string) {
    this.props.address = address
    this.touch()
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  public static create(
    props: Optional<SupplierProps, 'createdAt'>,
    id?: UniqueEntityID,
  ): Supplier {
    const supplier = new Supplier(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return supplier
  }
}

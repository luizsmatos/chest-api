import { Entity } from '@/core/entities/entity'
import { UniqueEntityID } from '@/core/entities/unique-entity-id'
import { Optional } from '@/core/types/optional'

export interface CompanyProps {
  name: string
  email: string
  phone: string
  address: string
  logo?: string
  createdAt: Date
  updatedAt?: Date | null
}

export class Company extends Entity<CompanyProps> {
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

  get logo() {
    return this.props.logo
  }

  set logo(logo: string | undefined) {
    this.props.logo = logo
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

  static create(
    props: Optional<CompanyProps, 'createdAt'>,
    id?: UniqueEntityID,
  ) {
    const company = new Company(
      {
        ...props,
        createdAt: props.createdAt ?? new Date(),
      },
      id,
    )

    return company
  }
}

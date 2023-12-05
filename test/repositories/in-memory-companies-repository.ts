import { Company } from '@/domain/companies/entities/company'
import { CompaniesRepository } from '@/domain/companies/repositories/companies-repository'

export class InMemoryCompaniesRepository extends CompaniesRepository {
  public items: Company[] = []

  async findById(id: string): Promise<Company | null> {
    const company = this.items.find((company) => company.id.toString() === id)

    if (!company) {
      return null
    }

    return company
  }

  async create(company: Company): Promise<void> {
    this.items.push(company)
  }

  async save(company: Company): Promise<void> {
    const itemIndex = this.items.findIndex((item) => item.id === company.id)

    this.items[itemIndex] = company
  }
}

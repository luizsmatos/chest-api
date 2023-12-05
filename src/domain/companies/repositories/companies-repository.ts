import { Company } from '../entities/company'

export abstract class CompaniesRepository {
  abstract findById(id: string): Promise<Company | null>
  abstract create(company: Company): Promise<void>
  abstract save(company: Company): Promise<void>
}

import { Encrypter } from '@/domain/users/cryptography/encrypter'

export class FakerEncrypter implements Encrypter {
  async encrypt(payload: Record<string, unknown>): Promise<string> {
    return JSON.stringify(payload)
  }
}

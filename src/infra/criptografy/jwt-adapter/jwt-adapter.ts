import jwt from 'jsonwebtoken'
import { Decrypter } from '../../../data/protocols/criptografy/decrypter'
import { Encrypter } from '../../../data/protocols/criptografy/encrypter'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor (private readonly secret: string) {}

  async encrypt (value: string): Promise<string> {
    const accessToken = jwt.sign({ id: value }, this.secret)
    return accessToken
  }

  async decrypt (value: string): Promise<string> {
    return jwt.verify(value, this.secret) as any
  }
}

import { Decrypter } from '@/data/protocols/criptografy/decrypter'
import { Encrypter } from '@/data/protocols/criptografy/encrypter'
import { HashComparer } from '@/data/protocols/criptografy/hash-comparer'
import { Hasher } from '@/data/protocols/criptografy/hasher'

export const mockHasher = (): Hasher => {
  class HasherStub implements Hasher {
    async hash (value: string): Promise<string> {
      return await new Promise(resolve => { resolve('any_password') })
    }
  }
  return new HasherStub()
}

export const mockDecrypter = (): Decrypter => {
  class DecrypterStub implements Decrypter {
    async decrypt (value: string): Promise<string> {
      return new Promise(resolve => { resolve('any_value') })
    }
  }
  return new DecrypterStub()
}

export const mockEncrypter = (): Encrypter => {
  class EncrypterStub implements Encrypter {
    async encrypt (value: string): Promise<string> {
      return await new Promise(resolve => { resolve('any_token') })
    }
  }
  return new EncrypterStub()
}

export const mockHashComparer = (): HashComparer => {
  class HashComparerStub implements HashComparer {
    async compare (value: string, hash: string): Promise<boolean> {
      return await new Promise(resolve => { resolve(true) })
    }
  }
  return new HashComparerStub()
}

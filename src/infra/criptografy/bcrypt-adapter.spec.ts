import { describe, expect, it, vitest } from 'vitest'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

describe('BCrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = vitest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })
})

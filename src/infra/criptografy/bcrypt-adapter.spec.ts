import { describe, expect, it, vitest } from 'vitest'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

vitest.mock('bcrypt', async () => {
  return {
    default: {
      hash: () => 'hashed_value'
    }
  }
})


describe('BCrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hashSpy = vitest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('Should returns a hash on success', async () => {
    const salt = 12
    const sut = new BcryptAdapter(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })
})

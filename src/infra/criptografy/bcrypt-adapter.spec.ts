import { describe, expect, it, vitest, vi } from 'vitest'
import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

vitest.mock('bcrypt', () => {
  return {
    default: {
      hash: () => 'hashed_value'
    }
  }
})

interface SutTypes {
  salt: number
  sut: BcryptAdapter
}

const makeSut = (): SutTypes => {
  const salt = 12
  const sut = new BcryptAdapter(salt)
  return {
    salt,
    sut
  }
}

describe('BCrypt Adapter', () => {
  it('Should call bcrypt with correct values', async () => {
    const { sut, salt } = makeSut()
    const hashSpy = vitest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  it('Should returns a hash on success', async () => {
    const { sut } = makeSut()
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hashed_value')
  })

  it('Should throw if bcrypt throws', async () => {
    const { sut } = makeSut()
    vitest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(
      vi.fn().mockRejectedValue(new Error())
    )
    const promise = sut.encrypt('any_value')
    await expect(promise).rejects.toThrow()
  })
})

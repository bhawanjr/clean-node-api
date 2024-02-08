import { describe, expect, it, vitest } from 'vitest'
import { EmailValidatorAdapter } from './email-validator-adapter'
import validator from 'validator'

vitest.mock('validator', async () => {
  return {
    default: {
      isEmail: () => true
    }
  }
})

const makeSut = () => {
  return new EmailValidatorAdapter()
}

describe('EmailValidator Adapter', () => {
  it('Should returns false if validator returns false', () => {
    const sut = makeSut()
    vitest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  it('Should returns true if validator returns true', () => {
    const sut = makeSut()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

  it('Should call validator with correct email', () => {
    const sut = makeSut()
    const isEmailSpy = vitest.spyOn(validator, 'isEmail')
    sut.isValid('valid_email@mail.com')
    expect(isEmailSpy).toHaveBeenCalledWith('valid_email@mail.com')
  })
})

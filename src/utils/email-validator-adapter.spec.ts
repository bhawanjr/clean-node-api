import { describe, expect, it, vitest } from 'vitest'
import { EmailValidatorAdapter } from './email-validator'
import validator from 'validator'

vitest.mock('validator', async () => {
  return {
    default: {
      isEmail: () => true
    }
  }
})

describe('EmailValidator Adapter', () => {
  it('Should returns false if validator returns false', () => {
    const sut = new EmailValidatorAdapter()
    vitest.spyOn(validator, 'isEmail').mockReturnValueOnce(false)
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })

  it('Should returns true if validator returns true', () => {
    const sut = new EmailValidatorAdapter()
    const isValid = sut.isValid('valid_email@mail.com')
    expect(isValid).toBe(true)
  })

})

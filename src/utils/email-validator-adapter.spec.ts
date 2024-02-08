import { describe, expect, it } from 'vitest'
import { EmailvalidatorAdapter } from './email-validator'

describe('EmailValidator Adapter', () => {
  it('Should returns false if validator returns false', () => {
    const sut = new EmailvalidatorAdapter()
    const isValid = sut.isValid('invalid_email@email.com')
    expect(isValid).toBe(false)
  })
})

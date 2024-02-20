import { describe, expect, it, vitest } from 'vitest' 
import { EmailValidator } from '../../protocols/email-validator'
import { EmailValidation } from './email-validation'
import { InvalidParamError } from '../../errors'

const makeEmailValidator = () => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }
  return new EmailValidatorStub()
}

interface SutTypes {
  sut: EmailValidation,
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutTypes => {
  const emailValidatorStub = makeEmailValidator()
  const sut = new EmailValidation('email', emailValidatorStub)
  return {
    sut,
    emailValidatorStub
  }
}

describe('Email Validation', () => {
  it('Should return an error if EmaildValidator retunrs false'), () => {
    const { sut, emailValidatorStub } = makeSut()
    vitest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)
    const error = sut.validate({ email: 'any_email@mail.com' })
    expect(error).toEqual(new InvalidParamError('email'))
  }

  it('Should call EmailValidator with correct email', () => {
    const { sut, emailValidatorStub} = makeSut()
    const isValidSpy = vitest.spyOn(emailValidatorStub, 'isValid')
    sut.validate({ email: 'any_email@mail.com'})
    expect(isValidSpy).toHaveBeenCalledWith('any_email@mail.com')
  })

  it('Should throw if EmailValidator throws', () => {
    const { sut, emailValidatorStub } = makeSut()
    vitest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error()
    })
    expect(sut.validate).toThrow()
  })
})
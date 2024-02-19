import { MissingParamError } from '../../errors'
import { Validation } from './validation'

export class RequiredFieldValidation implements Validation {
  constructor (private readonly fieldName: string) {}

  //@ts-ignore
  validate(input: any): Error {
    if (!input) {
      return new MissingParamError(this.fieldName)
    }    
  }
}

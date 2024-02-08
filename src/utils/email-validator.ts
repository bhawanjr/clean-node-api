import { EmailValidator } from '../presentation/protocols/email-validator'

export class EmailvalidatorAdapter implements EmailValidator {
  isValid (email: string): boolean {
    return false
  }
}
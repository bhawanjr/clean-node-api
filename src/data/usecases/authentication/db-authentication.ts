import { Authentication, AuthenticationModel } from "../../../domain/usecases/authentication"
import { HashComparer } from "../../protocols/criptografy/hash-comparer"
import { TokenGenerator } from "../../protocols/criptografy/token-generator"
import { LoadAccountByEmailRepository } from "../../protocols/db/load-account-by-email-repository"
import { UpdateAccessTokenRepository } from "../../protocols/db/update-access-token-repository"

export class DbAuthentication implements Authentication {
  constructor (
    private readonly loadAccountByEmailRepository: LoadAccountByEmailRepository,
    private readonly hashComparer: HashComparer,
    private readonly tokenGenerator: TokenGenerator,
    private readonly updateAccessTokenRepositoryStub: UpdateAccessTokenRepository
  ) {}

  async auth (authentication: AuthenticationModel): Promise<string> {
    const account = await this.loadAccountByEmailRepository.load(authentication.email)
    if (account) {
      const isValid = await this.hashComparer.compare(authentication.password, account.password)
      if (isValid) {
        const accessToken = await this.tokenGenerator.generate(account.id)
        await this.updateAccessTokenRepositoryStub.update(account.id, accessToken)
        return accessToken
      }
    }
    //@ts-ignore
    return null
  } 
}

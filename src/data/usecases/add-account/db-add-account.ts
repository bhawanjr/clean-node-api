import { AddAccount, AddAccountModel, AccountModel, Encrypter, AddAccountRepository } from "./db-add-account-protocols"

export class DbAddAccount implements AddAccount{
  constructor (
    private readonly encrypter: Encrypter,
    private readonly addAccountRepository: AddAccountRepository
  ) {}
  
  async add (accountData: AddAccountModel): Promise<AccountModel | null> {
    const hashed_password = await this.encrypter.encrypt(accountData.password)
    await this.addAccountRepository.add(Object.assign(accountData, { password: hashed_password }))
    return null
  }
}

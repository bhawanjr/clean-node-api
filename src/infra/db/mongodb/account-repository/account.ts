import { AddAccountRepository } from "../../../../data/protocols/add-account-repository"
import { AddAccountModel } from "../../../../domain/usecases/add-account"
import { AccountModel } from "../../../../domain/models/account"
import { MongoHelper } from "../helpers/mongo-helper"

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')
    const newId = (await accountCollection.insertOne(accountData))
    console.log(newId)

    // const account: AccountModel = Object.assign({}, {id: newId }, accountData)
    return Object.assign({}, {id: newId }, accountData)
  }
}

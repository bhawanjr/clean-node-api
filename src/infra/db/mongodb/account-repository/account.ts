import { AddAccountRepository } from "../../../../data/protocols/add-account-repository"
import { AddAccountModel } from "../../../../domain/usecases/add-account"
import { AccountModel } from "../../../../domain/models/account"
import { MongoHelper } from "../helpers/mongo-helper"

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const newId = (await accountCollection.insertOne(accountData)).insertedId.toString()
    return MongoHelper.mapper(newId, accountData)
  }
}

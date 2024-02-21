import { AddAccountRepository } from "../../../../data/protocols/db/account/add-account-repository"
import { AddAccountModel } from "../../../../domain/usecases/add-account"
import { AccountModel } from "../../../../domain/models/account"
import { MongoHelper } from "../helpers/mongo-helper"
import { LoadAccountByEmailRepository } from "../../../../data/protocols/db/account/load-account-by-email-repository"
import { UpdateAccessTokenRepository } from "../../../../data/protocols/db/account/update-access-token-repository"

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository, UpdateAccessTokenRepository {  
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const _id = (await accountCollection.insertOne(accountData)).insertedId.toString()
    return MongoHelper.mapper(_id, accountData)
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    //@ts-ignore
    return account && MongoHelper.mapper(account._id, account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    //@ts-ignore
    await accountCollection.updateOne({ _id: id }, { $set: { accessToken: token }})
  }
}

import { Collection, MongoClient } from "mongodb"
import { mongoUrl } from "../../../../../env"

export const MongoHelper = {
  client: MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(mongoUrl, {})
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  },

  mapper: (newId: string, model: any): any => {
    return Object.assign({}, {id: newId }, model)
  }
}

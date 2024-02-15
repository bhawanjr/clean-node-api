import { Collection, MongoClient } from "mongodb"
import { mongoUrl } from "../../../../../env"

export const MongoHelper = {
  client: MongoClient,

  async connect (uri: string): Promise<void> {
    console.log('Connecting in mongodb...')
    this.client = await MongoClient.connect(mongoUrl, {})
    console.log('Mongodb connected.')
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  },

  getCollection (name: string): Collection {
    return this.client.db().collection(name)
  }
}

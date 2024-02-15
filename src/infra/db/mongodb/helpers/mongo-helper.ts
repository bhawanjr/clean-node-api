import { MongoClient } from "mongodb"
import { mongoUrl } from "../../../../../env"

export const MongoHelper = {
  client: MongoClient,

  async connect (uri: string): Promise<void> {
    this.client = await MongoClient.connect(mongoUrl, {
    })
  },

  async disconnect (): Promise<void> {
    await this.client.close()
  }
}

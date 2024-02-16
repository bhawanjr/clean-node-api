import { Collection, MongoClient } from "mongodb"

export const MongoHelper = {
  client: MongoClient,
  uri: '',
  isConnected: false,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri, {})
    this.isConnected = true
  },

  async disconnect (): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
    }
    this.isConnected = false
  },

  async getCollection (name: string): Promise<Collection> {
    if (!this.client || !this.isConnected) {
      await this.connect(this.uri)
    }
    return this.client.db().collection(name)
  },

  mapper: (newId: string, model: any): any => {
    return Object.assign({}, {id: newId }, model)
  }
}

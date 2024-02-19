import { Collection, MongoClient } from "mongodb"

export const MongoHelper = {
  client: MongoClient,
  uri: '',
  isConnected: false,

  async connect (uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(this.uri, {})
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

  getIsConnected (): boolean {
    return this.isConnected
  },

  isAssigned (): boolean {
    return this.client
  },

  mapper: (newId: string, model: any): any => {
    const newObject = Object.assign({}, {id: newId }, model)
    delete newObject._id
    return newObject
  }
}

import request from 'supertest'
import app from '../config/app'
import { afterAll, beforeAll, beforeEach, describe, it } from 'vitest'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import env from '../config/env'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async() => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  it('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Junior',
        email: 'junior@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(200)
  })
})

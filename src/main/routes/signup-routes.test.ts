import { afterAll, beforeAll, beforeEach, describe, test } from 'vitest'
import request from 'supertest'
import app from '../config/app'
import env from '../config/env'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Signup Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(env.mongoUrl)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Nicolas',
        email: 'nicolas@email.com',
        password: '123',
        passwordConfirmation: '123'
      })
      .expect(201)
  })
})

import request from 'supertest'
import app from '../config/app'
import { describe, it } from 'vitest'

describe('Signup Routes', () => {
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

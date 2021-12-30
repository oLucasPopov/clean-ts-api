import request from 'supertest'
import app from '../config/app'

describe('SignUp Routes', () => {
  test('Should return an account on success', async () => {
    await request(app)
      .post('/api/signup')
      .send({
        name: 'Lucas',
        email: 'lucaspopov@protonmail.com',
        password: 'senha123',
        passwordConfirmation: 'senha123'
      })
      .expect(200)
  })
})

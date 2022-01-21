import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'
import { Collection } from 'mongodb'
import { hash } from 'bcrypt'

let accountCollection: Collection
describe('Login Routes', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
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

  describe('POST /Login', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('senha123', 12)

      await accountCollection.insertOne({
        name: 'Lucas',
        email: 'lucaspopov@protonmail.com',
        password
      })

      await request(app)
        .post('/api/login')
        .send({
          email: 'lucaspopov@protonmail.com',
          password: 'senha123'
        })
        .expect(200)
    })
  })
})

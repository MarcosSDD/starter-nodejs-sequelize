const supertest = require('supertest')
const app = require('../../app').app
const server = require('../../../server')
const { User, db } = require('../../models/')
const api = supertest(app)

const newUser = {
  name: 'John',
  surname: 'Doe',
  username: 'john_d',
  email: 'john_doe@gmail.com',
  password: '123456Secret',
}

const defaultUser = {
  name: 'User',
  surname: 'Default',
  username: 'user_d',
  email: 'user@gmail.com',
  password: '123456Secret',
}

beforeEach(async () => {
  await User.destroy({
    where: {},
    truncate: true,
  })

  await User.create(defaultUser)
})

afterEach(() => {
  server.close()
})

describe('# POST new user', () => {
  it('should create a user', async () => {
    await api
      .post('/api/user/')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body).toHaveProperty('id')
      })
  })
  it('should create a user with error "User exist" ', async () => {
    await api
      .post('/api/user/')
      .send(defaultUser)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.error).toBe('User already exists')
      })
  })
})

describe.skip('# Get login user ', () => {
  it('should data user', async () => {
    await api
      .get('/api/user/login')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
  })
})

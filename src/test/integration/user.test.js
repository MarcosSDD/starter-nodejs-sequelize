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

afterEach(async () => {
  await User.destroy({
    where: {},
    truncate: true,
  })
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
  it('should not create a user by "User exist" error', async () => {
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

describe('# Get login user ', () => {
  it('should must provide login user data', async () => {
    const loginUser = {
      email: 'user@gmail.com',
      password: '123456Secret',
    }
    await api
      .post('/api/user/login')
      .send(loginUser)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body).toHaveProperty('id')
      })
  })

  it('should must provide User not found', async () => {
    const failUser = {
      email: 'failUser@gmail.com',
      password: '123456Secret',
    }
    await api
    .post('/api/user/login')
    .send(failUser)
    .expect(404)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect((res) => {
      expect(res.body.error).toBe('User not found')
    })
  })

  it('should must provide password does not match', async () => {
    const failUser = {
      email: 'user@gmail.com',
      password: '123456FailSecret',
    }
    await api
    .post('/api/user/login')
    .send(failUser)
    .expect(403)
    .expect('Content-Type', 'application/json; charset=utf-8')
    .expect((res) => {
      expect(res.body.error).toBe('Password does not match')
    })
  })

})

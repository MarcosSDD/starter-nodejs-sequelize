const supertest = require('supertest')
const app = require('../../app').app
const server = require('../../../server')
const {
  cleanDataBase,
  createUser,
  findUserByMail,
  newUser,
  defaultUser,
  fakeId,
  modifiedUser,
} = require('../helpers/integraHelper')

const api = supertest(app)

beforeEach(async () => {
  await cleanDataBase()

  await createUser(defaultUser)
})

afterEach(async () => {
  await cleanDataBase()
  server.close()
})

describe('# POST create new user', () => {
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

describe('# POST login user ', () => {
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
    const fakeUser = {
      email: 'failUser@gmail.com',
      password: '123456Secret',
    }
    await api
      .post('/api/user/login')
      .send(fakeUser)
      .expect(404)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.error).toBe('User not found')
      })
  })

  it('should must provide password does not match', async () => {
    const fakePassUser = {
      email: 'user@gmail.com',
      password: '123456FailSecret',
    }
    await api
      .post('/api/user/login')
      .send(fakePassUser)
      .expect(403)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.error).toBe('Password does not match')
      })
  })
})

describe('# GET profile user', () => {
  it('should provide user profile', async () => {
    const userDef = await findUserByMail()

    await api
      .get(`/api/user/${userDef.id}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body).toHaveProperty('email')
        expect(res.body).toHaveProperty('name')
      })
  })

  it('should must provide User not found', async () => {
    await api
      .get(`/api/user/${fakeId}`)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.error).toBe('User not found')
      })
  })
})

describe('# PUT update user', () => {
  it('should update user', async () => {
    const userDef = await findUserByMail()

    await api
      .put(`/api/user/${userDef.id}`)
      .send(modifiedUser)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.email).toBe('modifiedUser@gmail.com')
      })
  })

  it('should try to update the user with "User not found" error', async () => {
    await api
      .put(`/api/user/${fakeId}`)
      .send(modifiedUser)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.error).toBe('User not found')
      })
  })

  it('should update user', async () => {
    await createUser(newUser)

    const userDef = await findUserByMail()

    const existUser = { ...defaultUser, email: 'john_doe@gmail.com' }
    await api
      .put(`/api/user/${userDef.id}`)
      .send(existUser)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.error).toBe('Address already exists')
      })
  })
})

describe('# DELETE user', () => {
  it('should delete user', async () => {
    const userDef = await findUserByMail()
    await api
      .delete(`/api/user/${userDef.id}`)
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.msg).toBe('User Deleted')
      })
  })

  it('should try to delete user with "User not found" error ', async () => {
    await api
      .delete(`/api/user/${fakeId}`)
      .expect(400)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        expect(res.body.error).toBe('User not found')
      })
  })
})

describe('# GET all Users', () => {
  it('should provide All users', async () => {
    await createUser(newUser)
    await api
      .get('/api/user/')
      .expect(200)
      .expect('Content-Type', 'application/json; charset=utf-8')
      .expect((res) => {
        console.log(res.body)
        expect(res.body).toHaveLength(2)
      })
  })
})

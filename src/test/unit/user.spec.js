const { userController } = require('../../controllers')
const User = require('../../models').User

afterEach(() => {
  jest.resetAllMocks()
})

describe('# Service Endpoints', () => {
  describe('# User Endpoints', () => {
    describe('# Create user (POST)', () => {
      it('# creates a resource', async () => {
        const res = {
          status: jest.fn().mockReturnThis(),
          json: jest.fn(),
        }

        const req = {
          body: {
            name: 'Marcos',
            surname: 'Saldivia',
            username: 'marcos_s',
            email: 'marcos2@gmail.com',
            password: 'vegeta',
          },
        }
        jest
          .spyOn(User, 'findOne')
          .mockImplementation(() => Promise.resolve(false))

        jest.spyOn(User, 'create').mockImplementation(() => Promise.resolve({}))

        await userController.register(req, res)

        expect(res.status.mock.calls).toEqual([[201]])

        expect(res.json.mock.calls).toHaveLength(1)

        expect(res.json.mock.calls[0][0].success).toBe(true)
      })

      it('# creates a resourcewith error by user exist', async () => {
        const res = {
          status: jest.fn().mockReturnThis(),
          send: jest.fn(),
          json: jest.fn(),
        }

        const req = {
          body: {
            name: 'Marcos',
            surname: 'Saldivia',
            username: 'marcos_s',
            email: 'marcos2@gmail.com',
            password: 'vegeta',
          },
        }
        jest
          .spyOn(User, 'findOne')
          .mockImplementation(() => Promise.resolve(true))

        await userController.register(req, res)

        expect(res.status.mock.calls).toEqual([[400]])

        expect(res.json.mock.calls).toHaveLength(1)

        expect(res.json.mock.calls[0][0].msg).toBe('Usuario ya registrado')
      })
    })
  })
})

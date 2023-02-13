const User = require('../models').User
const logger = require('../../logger')

module.exports = {
  async register(req, res) {
    /*#swagger.tags = ['User'];
      #swagger.description = 'Create a User';
      #swagger.summary = "Create User";
      #swagger.requestBody = {
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/definitions/User" },
            }
        }
      }
    */

    const { name, surname, email, password } = req.body

    // Validate User Exists
    const userExists = await User.findOne({
      where: { email },
    })
    if (userExists) {
      const error = new Error('User already exists')
      logger.error(error)
      res.status(400)
      return res.json({ error: error.message })
    }
    try {
      const saveUser = await User.create({
        name,
        surname,
        email,
        password,
      })
      //TODO: confirmation by email
      /* #swagger.responses[201] = {
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/newUser" },
            }
          }
        },
      */
      res.status(201)
      res.json({
        id: saveUser.id,
        name: saveUser.name,
        surname: saveUser.surname,
        email: saveUser.email,
        createdAt: saveUser.createdAt,
        updatedAt: saveUser.updatedAt,
        success: true,
      })
    } catch (error) {
      /* #swagger.responses[500] = {          
        schema: { "error": "Internal Error" },
      },
      */
      logger.error(error.errors)
      res.status(500)
      return res.json({ error: error.message })
    }
  },

  async login(req, res) {
    /*#swagger.tags = ['User'];
		  #swagger.description = 'Login User'
      #swagger.summary = "Login user"
    */
    const { email, password } = req.body

    // Validate User Exists .scope("sendDataUser")
    const userLogin = await User.findOne({ where: { email } })
    if (!userLogin) {
      const error = new Error('User not found')
      res.status(404)
      return res.json({ error: error.message })
    }

    // comprobar passwd
    if (await userLogin.validPassword(password)) {
      res.status(200)
      res.json({
        id: userLogin.id,
        name: userLogin.name,
        surname: userLogin.surname,
      })
    } else {
      const error = new Error('Password does not match')
      res.status(403)
      return res.json({ error: error.message })
    }
  },

  async profile(req, res) {
    /*#swagger.tags = ['User'];
		  #swagger.description = 'Profile User'
      #swagger.summary = "Profile user"
    */
    const { id } = req.params
    // Validate User Exists
    const userExists = await User.scope('sendDataUser').findOne({
      where: { id },
    })
    if (!userExists) {
      const error = new Error('User not found')
      logger.error(error)
      res.status(400)
      return res.json({ error: error.message })
    }
    res.status(200)
    res.json(userExists.dataValues)
  },

  async update(req, res) {
    /*#swagger.tags = ['User'];
		  #swagger.description = 'Update User'
      #swagger.summary = "Update user"
    */
    const { id } = req.params
    const { email } = req.body
    try {
      const userToUp = await User.scope('sendDataUser').findByPk(id)
      if (!userToUp) {
        const error = new Error('User not found')
        logger.error(error)
        res.status(400)
        return res.json({ error: error.message })
      }

      if (userToUp.email !== email) {
        const emailExists = await User.findOne({ where: { email } })
        if (emailExists) {
          const error = new Error('Address already exists')
          logger.error(error)
          res.status(400)
          return res.json({ error: error.message })
        }
      }

      userToUp.name = req.body.name
      userToUp.surname = req.body.surname
      userToUp.birthday = req.body.birthday
      userToUp.gender = req.body.gender
      userToUp.email = req.body.email
      userToUp.username = req.body.username

      const userUp = await userToUp.save()
      res.status(200).json(userUp)
    } catch (error) {
      logger.error(error)
    }
  },

  async delete(req, res) {
    /*#swagger.tags = ['User'];
		  #swagger.description = 'Delete User'
      #swagger.summary = "Delete user"
    */
    try {
      const { id } = req.params
      const userToDel = await User.findByPk(id)
      if (!userToDel) {
        const error = new Error('User not found')
        logger.error(error)
        res.status(400)
        return res.json({ error: error.message })
      }

      userToDel.destroy()
      res.status(200)
      return res.json({ msg: 'User Deleted' })
    } catch (error) {
      logger.error(error)
      res.status(500)
      return res.json({ error: error })
    }
  },

  async allUsers(req, res) {
    /*#swagger.tags = ['User'];
		  #swagger.description = 'Get All Users'
      #swagger.summary = "Get All users"
    */
    try {
      //TODO: pagination
      const users = await User.scope('sendDataUser').findAll()
      res.status(200)
      return res.json(users)
    } catch (error) {
      console.log(error)
      return res.status(500).json({ error: error })
    }
  },
}

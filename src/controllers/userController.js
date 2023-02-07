const User = require('../models').User
const logger = require('../../logger')

module.exports = {
  async register(request, response) {
    /*#swagger.tags = ['User'];
      #swagger.description = 'Create a User'
      #swagger.summary = "Create user"
      #swagger.requestBody = {
        description = 'Create a User',
        required: true,
        content: {
            "application/json": {
                schema: { $ref: "#/definitions/User" },
            }
        }
      }
    */
    const { name, surname, email, password } = request.body
    
    // Validate User Exists
    const userExists = await User.findOne({
      where: { email },
    })
    if (userExists) {
      const error = new Error('Usuario ya registrado')
      logger.error(error)
      response.status(400)
      return response.json({ msg: error.message })
    }
    try {
      const saveUser = await User.create({
        name,
        surname,
        email,
        password,
      })

      //enviar E-mail confirmación

      /* #swagger.responses[201] = {
          content: {
            "application/json": {
              schema: { $ref: "#/definitions/newUser" },
            }
          }
        },
      */
      response.status(201)
      response.json({
        id: saveUser.id,
        name: saveUser.name,
        surname: saveUser.surname,
        email: saveUser.email,
        createdAt: saveUser.createdAt,
        updatedAt: saveUser.updatedAt,
        success: true,
      })
    } catch (error) {
      logger.error(error.errors)
      /* #swagger.responses[500] = {          
              schema: { "msg": "Internal Error" },
          },
      */
      response.status(500)
      return response.json({ msg: error.message })
    }
  },
  login(request, response) {
    /*#swagger.tags = ['User'];
		  #swagger.description = 'Login User'
      #swagger.summary = "Login user"
     */
    response.status(200).json({ msg: 'Login from controller' })
  },
}

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
      return res.json({ "error": error.message })
    }
    try {
      const saveUser = await User.create({
        name,
        surname,
        email,
        password,
      })

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
      logger.error(error.errors)
      /* #swagger.responses[500] = {          
              schema: { "error": "Internal Error" },
          },
      */
      res.status(500)
      return res.json({ "error": error.message })
    }
  
  },

  async login(req, res) {
    /*#swagger.tags = ['User'];
		  #swagger.description = 'Login User'
      #swagger.summary = "Login user"
     */
      const { email, password } = req.body;
    
      // Validate User Exists .scope("sendDataUser")
      const userLogin = await User.findOne({ where :{ email } });
      if (!userLogin){
          const error = new Error("NONEXISTENT_USER");
          response.status(404)
          return response.json({ msg: error.message });
      }
  
      // comprobar passwd
      if( await userLogin.validPassword(password) ){
          res.status(200).json({
              id:userLogin.id,
              name: userLogin.name,
              surname: userLogin.surname,
          })
      } else {
          const error = new Error("Password does not match");
          return res.status(403).json({ msg: error.message });
      }
    res.status(200).json(userLogin)
  },

  async profile(req, res) {
    const { id } = req.params;

    // Validate User Exists
    const userExists = await User.scope("sendDataUser").findOne({
      where: { id },
    })
    if (!userExists) {
      const error = new Error('NONEXISTENT_USER')
      logger.error(error)
      res.status(400)
      return res.json({ "error": error.message })
    }

    res.status(200).json(userExists)
  },

  async allUsers(req,res){

  },

  async update(req,res){
    
  },

  async delete(req,res){

  },

}

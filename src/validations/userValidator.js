const { check, validationResult } = require('express-validator')
const logger = require('../../logger')

module.exports = { 
  async validUser (request, response, next) {
    await check('name')
      .notEmpty()
      .trim()
      .withMessage('The name cannot be empty')
      .run(request)
    await check('surname')
      .notEmpty()
      .trim()
      .withMessage('The surname cannot be empty')
      .run(request)
    await check('email')
      .isEmail()
      .trim()
      .withMessage('Add valid email')
      .run(request)
    await check('password')
      .isLength({ min: 8 })
      .trim()
      .withMessage('The password is too short')
      .run(request)

    const errors = validationResult(request)
    if (!errors.isEmpty()) {
      logger.error(errors.array())
      response.status(400)
      return response.json({ error: errors.array() })
    }
    return next()
  },
} 

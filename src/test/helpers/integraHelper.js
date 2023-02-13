const { User } = require('../../models/')

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

const fakeId = 'XXXXXXXXXXXX001'

const modifiedUser = { ...defaultUser, email: 'modifiedUser@gmail.com' }

const cleanDataBase = async () => {
  await User.destroy({
    where: {},
    truncate: true,
  })
}

const createUser = async (user) => {
  await User.create(user)
}

const findUserByMail = async () => {
  return await User.findOne({ where: { email: defaultUser.email } })
}

module.exports = {
  newUser,
  defaultUser,
  fakeId,
  modifiedUser,
  cleanDataBase,
  createUser,
  findUserByMail,
}

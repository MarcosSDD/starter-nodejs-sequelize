'use strict'
const { Model } = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    //static associate(models) {
    // define association here
    //}

    validPassword(password) {
      return bcrypt.compareSync(password, this.password)
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING(100),
        notEmpty: true,
        allowNull: false,
      },
      surname: {
        type: DataTypes.STRING(100),
        notEmpty: true,
        allowNull: false,
      },
      birthday: {
        type: DataTypes.DATE,
      },
      gender: {
        type: DataTypes.ENUM('male', 'female', 'LGBT+'),
        allowNull: true,
        defaultValue: 'male',
        validate: {
          isIn: [['male', 'female', 'LGBT+']],
        },
      },
      email: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        notEmpty: true,
        allowNull: false,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      confirmed: {
        type: DataTypes.BOOLEAN,
        notEmpty: true,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10)
          user.password = await bcrypt.hashSync(user.password, salt)
        },
      },
      scopes: {
        sendDataUser: {
          attributes: {
            exclude: [
              'updatedAt',
              'createdAt',
              'password',
              'token',
              'confirmed',
            ],
          },
        },
      },
      sequelize,
      modelName: 'User',
    }
  )

  return User
}

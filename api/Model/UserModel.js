'use strict'

import {encrypt} from '../util'

export default function (sequelize, DataTypes) {

  let User = sequelize.define('User', {
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
    email: {type: DataTypes.STRING, allowNull: false, unique: true},
    password: {
                type: DataTypes.STRING,
                allowNull: false,
                set: function (plainPass) {
                  this.setDataValue('password', encrypt(plainPass))
                }},
    lastConnection: {type: DataTypes.DATE, default: Date.now}
  }, {
    classMethods: {
      associate: function (db) {
        User.hasMany(db['Character'])
      }
    },
    instanceMethods: {
      authenticate: function (plainPass) {
        return encrypt(plainPass) === this.password
      }
    }
  })

  return User
}

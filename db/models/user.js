'use strict'

//const bcrypt = require('bcrypt')
const Sequelize = require('sequelize')
const db = require('../index.js')

const User = db.define('users', {
  id: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  login: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
})

// function setEmailAndPassword(user) {
//   user.email = user.email && user.email.toLowerCase()
//   if (!user.password) return Promise.resolve(user)
//
//   return new Promise((resolve, reject) =>
// 	  bcrypt.hash(user.get('password'), 10, (err, hash) => {
// 		  if (err) reject(err)
// 		  user.set('password_digest', hash)
//       resolve(user)
// 	  })
//   )
// }

module.exports = User
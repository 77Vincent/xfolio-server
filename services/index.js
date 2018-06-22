const General = require('./general')
const Storage = require('./storage')
const Auth = require('./auth')
const { sequelizeQuery } = require('./sequelize-query')

module.exports = {
  General,
  Storage,
  Auth,
  sequelizeQuery,
}

import { Sequelize } from 'sequelize'

console.log(process.env.MYSQL_URL)
if (!process.env.MYSQL_URL)
  throw new Error('Process ENV is not correctly configured: MYSQL_URL')
const sequelize = new Sequelize('mariadb://' + process.env.MYSQL_URL, {
  database: process.env.MYSQL_DATABASE,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  logging: undefined,
})

sequelize.sync({ alter: true, match: /_test$/ }) // Recreate tables if changed if the database name ends in '_test'

export default sequelize

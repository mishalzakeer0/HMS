require('dotenv').config()
module.exports = {
    HOST : process.env.DB_HOST,
    USER : process.env.DB_USER,
    PASSWORD : process.env.DB_PASSWORD,
    DATABASE : process.env.DB_DATABASE
}
console.log("hello",process.env.DB_HOST)
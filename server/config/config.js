const config = require('../secret/passwords.js');



module.exports = {
  "development": {
	"username": config.DATABASE_USERNAME,
	"password": config.DATABASE_PASSWORD,
	"database": config.DATABASE_NAME,
	"host": config.DATABASE_HOST,
	"dialect": "mysql"
  },
  "production": {
    "username": config.DATABASE_USERNAME,
    "password": config.DATABASE_PASSWORD,
    "database": config.DATABASE_NAME,
    "host": config.DATABASE_HOST,
    "dialect": "mysql"
  }
}

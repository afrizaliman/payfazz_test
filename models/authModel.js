const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'test_api',
  password: 'password',
  port: 5432,
})
var result = {}
let jwt = require('jsonwebtoken');
let config = require('../config');

const signIn = (request, response) => {
    let username = request.body.username;
    let password = request.body.password;

    let mockedUsername = 'admin';
    let mockedPassword = 'admin';

    if (username && password) {
      if (username === mockedUsername && password === mockedPassword) {
        
        let token = jwt.sign({username: username},
          config.secret,
          { expiresIn: '24h' // expires in 24 hours
          }
        );
        result.success = true
        result.message = `Authentication successful!`
        result.data = {"token":token}
        return response.status(200).json(result)
      } else {
        result.success = true
        result.message = `Incorrect username or password!`
        return response.status(403).json(result)
      }
    } else {
        result.success = true
        result.message = `Authentication failed! Please check the request!`
        return response.status(400).json(result)
    }
}

module.exports = {
  signIn
}
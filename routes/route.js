let express = require('express');
let middleware = require('../middleware');
let route = express.Router();

route.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

const authController = require('../controllers/authController')
route.post('/signIn',authController.validate('signIn'), authController.signIn)

module.exports = route;
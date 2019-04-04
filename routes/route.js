let express = require('express');
let middleware = require('../middleware');
let route = express.Router();

route.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

const authController = require('../controllers/authController')
route.post('/signIn',authController.validate('signIn'), authController.signIn)

// CRUD Company Feature
const companyController = require('../controllers/companyController')
route.get('/company', companyController.getCompany)
route.get('/company/get-by-code/:company_code', companyController.getCompanyByCode)
route.post('/company/search-by-name',middleware.checkToken, companyController.searchCompanyByName)
route.post('/company', middleware.checkToken, companyController.validate('createCompany'), companyController.createCompany)
route.patch('/company/:id', middleware.checkToken, companyController.validate('updateCompany'), companyController.updateCompany)
route.delete('/company/:id', middleware.checkToken,companyController.validate('deleteCompany'), companyController.deleteCompany)

module.exports = route;
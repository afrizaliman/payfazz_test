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

// CRUD Employee Feature
const employeeController = require('../controllers/employeeController')
route.get('/employee', employeeController.getEmployee)
route.get('/employee/get-by-id-no/:id_no', employeeController.getEmployeeByIdNo)
route.get('/employee/get-history-company/:id_no', employeeController.getHistoryCompanyEmployee)
route.post('/employee/search-by-name', middleware.checkToken, employeeController.searchEmployeeByName)
route.post('/employee/set-partner', middleware.checkToken, employeeController.setPartner)
route.get('/employee/get-partner/:id_no', employeeController.getPartner)
route.get('/employee/get-partner-of-partner/:id_no', employeeController.getPartnerOfPartner)
route.get('/employee/get-employee-partner-company/:id_no', employeeController.getEmployeePartnerCompany)
route.post('/employee', middleware.checkToken, employeeController.validate('createEmployee'), employeeController.createEmployee)
route.patch('/employee/:id', middleware.checkToken, employeeController.validate('updateEmployee'),employeeController.updateEmployee)
route.delete('/employee/:id',middleware.checkToken, employeeController.validate('deleteEmployee'), employeeController.deleteEmployee)

module.exports = route;
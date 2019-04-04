
const employeeCompanyModel = require('../models/employeeCompanyModel')
const { body } = require('express-validator/check')
var result = {}

const validate = (method) => {
  switch (method) {
    case 'setEmployee': {
      return [ 
          body('employee_id', 'Employee ID doesnt exists').exists().isInt(),
          body('division', 'Division doesnt exists').exists(),
          body('job_position', 'Job Position doesnt exists').exists(),
          body('join_date', 'Join Date doesnt exists').exists().isDate()
      ]   
    }
    case 'updateEmployee': {
      return [ 
          body('division', 'Division doesnt exists').exists(),
          body('job_position', 'Job Position doesnt exists').exists(),
          body('join_date', 'Join Date is not valid').exists().isDate(),
          body('resign_date','Resign Date is not valid').optional().isDate()
      ]   
    }
    case 'deleteEmployee': {
      return [ 
        
      ]   
    }
  }
}

const validationHandler = next => result => {
  if (result.isEmpty()) return
  if (!next){
    throw (
      {"success":false, "message":result.array().map(i => `${i.msg}`).join(', ')}
    )
  } else{
    return next(
      new Error(
       result.array().map(i => `${i.msg}`).join('')
      )
    )
  }
}

const getCurrentEmployeeByCode = (request, response) => {
    employeeCompanyModel.getCurrentEmployeeByCode(request, response)
}

const getEmployeeByCode = (request, response) => {
  employeeCompanyModel.getEmployeeByCode(request, response)
}

const setEmployee = (request, response, next) => {
  request.getValidationResult()
    .then(validationHandler()).then(() => {
        employeeCompanyModel.setEmployee(request, response)
  }).catch(next => {
    response.status(400).json(next)
  }) 
}

const updateEmployee = (request, response, next) => {
  request.getValidationResult()
    .then(validationHandler()).then(() => {
        employeeCompanyModel.updateEmployee(request, response)
  }).catch(next => {
    response.status(400).json(next)
  }) 
}

const deleteEmployee = (request, response, next) => {
  request.getValidationResult()
      .then(validationHandler()).then(() => {
        employeeCompanyModel.deleteEmployee(request, response)
  }).catch(next => {
      response.status(400).json(next)
  }) 
}
  
module.exports = {
  validate,
  getCurrentEmployeeByCode,
  getEmployeeByCode,
  setEmployee,
  updateEmployee,
  deleteEmployee,
}

const employeeModel = require('../models/employeeModel')
const { body } = require('express-validator/check')
var result = {}

const validate = (method) => {
    switch (method) {
      case 'createEmployee': {
        return [ 
            body('employee_id_no', 'Employee ID No doesnt exists').exists(),
            body('employee_name', 'Employee Name doesnt exists').exists(),
            body('employee_email','Email is not valid').exists().isEmail()
        ]   
      }
      case 'updateEmployee': {
        return [ 
            body('employee_id_no', 'Employee ID No doesnt exists').exists(),
            body('employee_name', 'Employee Name doesnt exists').exists(),
            body('employee_email','Email is not valid').exists().isEmail()
        ]   
      }
      case 'setPartner': {
        return [ 
            body('employee_id_request', 'Employee ID Request doesnt exists').exists(),
            body('employee_id_approved', 'Employee ID Destination doesnt exists').exists()
        ]   
      }
      case 'deleteEmployee': {
        return [ 
          // param('id', 'Param doesnt exists').exists()
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

const getEmployee = (request, response) => {
    employeeModel.getEmployee(request, response)
}
  
const getEmployeeByIdNo = (request, response) => {
    employeeModel.getEmployeeByIdNo(request, response)
}

const getHistoryCompanyEmployee = (request, response) => {
  employeeModel.getHistoryCompanyEmployee(request, response)
}

const getPartner = (request, response) => {
  employeeModel.getPartner(request, response)
}

const getPartnerOfPartner = (request, response) => {
  employeeModel.getPartnerOfPartner(request, response)
}

const getEmployeePartnerCompany = (request, response) => {
  employeeModel.getEmployeePartnerCompany(request, response)
}

const searchEmployeeByName = (request, response) => {
  employeeModel.searchEmployeeByName(request, response)
}

const setPartner = (request, response) => {
  employeeModel.setPartner(request, response)
}

const createEmployee = (request, response, next) => {
    request.getValidationResult()
        .then(validationHandler()).then(() => {
            employeeModel.createEmployee(request, response)
    }).catch(next => {
        response.status(400).json(next)
    }) 
}

const updateEmployee = (request, response, next) => {
    request.getValidationResult()
        .then(validationHandler()).then(() => {
            employeeModel.updateEmployee(request, response)
    }).catch(next => {
        response.status(400).json(next)
    }) 
}

const deleteEmployee = (request, response, next) => {
    request.getValidationResult()
        .then(validationHandler()).then(() => {
            employeeModel.deleteEmployee(request, response)
    }).catch(next => {
        response.status(400).json(next)
    }) 
}

module.exports = {
    validate,
    getEmployee,
    getEmployeeByIdNo,
    getHistoryCompanyEmployee,
    getPartner,
    getPartnerOfPartner,
    getEmployeePartnerCompany,
    setPartner,
    searchEmployeeByName,
    createEmployee,
    updateEmployee,
    deleteEmployee
}
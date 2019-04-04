
const companyModel = require('../models/companyModel')
const { body } = require('express-validator/check')
var result = {}

const validate = (method) => {
  switch (method) {
    case 'createCompany': {
      return [ 
          body('company_code', 'Company Code doesnt exists').exists(),
          body('company_name', 'Company Name doesnt exists').exists(),
          body('parent_id','Invalid parent ID').optional().isInt()
      ]   
    }
    case 'updateCompany': {
      return [ 
          body('company_name', 'Company Name doesnt exists').exists(),
          body('parent_id','Invalid parent ID').optional().isInt()
      ]   
    }
    case 'deleteCompany': {
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

const getCompany = (request, response) => {
  companyModel.getCompany(request, response)
}
  
const getCompanyByCode = (request, response) => {
  companyModel.getCompanyByCode(request, response)
}

const searchCompanyByName = (request, response) => {
  companyModel.searchCompanyByName(request, response)
}

const createCompany = (request, response, next) => {
  request.getValidationResult()
    .then(validationHandler()).then(() => {
      companyModel.createCompany(request, response)
  }).catch(next => {
    response.status(400).json(next)
  }) 
}

const updateCompany = (request, response, next) => {
  request.getValidationResult()
    .then(validationHandler()).then(() => {
      companyModel.updateCompany(request, response)
  }).catch(next => {
    response.status(400).json(next)
  }) 
}

const deleteCompany = (request, response, next) => {
  companyModel.deleteCompany(request, response)
}

module.exports = {
  validate,
  getCompany,
  getCompanyByCode,
  searchCompanyByName,
  createCompany,
  updateCompany,
  deleteCompany
}

const authModel = require('../models/authModel')
const { body } = require('express-validator/check')
var result = {}

const validate = (method) => {
  switch (method) {
    case 'signIn': {
      return [ 
          body('username', 'Username doesnt exists').exists(),
          body('password', 'Password doesnt exists').exists()
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

const signIn = (request, response) => {
    request.getValidationResult()
        .then(validationHandler()).then(() => {
            authModel.signIn(request, response)
    }).catch(next => {
        response.status(400).json(next)
    }) 
}

module.exports = {
  validate,
  signIn
}
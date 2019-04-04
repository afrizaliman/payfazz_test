const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'test_api',
  password: 'password',
  port: 5432,
})
var result = {}

const getCompany = (request, response) => {
    result.success = false
    result.message = ''
    result.data = []
    pool.query('SELECT company_id, company_code, company_name, company_address FROM company WHERE is_deleted = false ORDER BY company_id ASC', (error, results) => {
      if (error) {
        result.message = 'Failed get data company, please try again'
        response.status(500).json(result)
      }
      result.success = true
      result.message = results.rowCount+' data found'
      if(results.rowCount > 0){
        result.data = results.rows
      } else {
        result.message = 'Data not found'
        result.data = []
      }
      response.status(200).json(result)
    })
}
  
const getCompanyByCode = (request, response) => {
  const company_code = parseInt(request.params.company_code)
  result.success = false
  result.data = []
  pool.query('SELECT company_id, company_code, company_name, company_address FROM company WHERE company_code = $1 AND is_deleted = false', [company_code], (error, results) => {
    if (error) {
      result.message = 'Invalid parameter Company Code'
      response.status(400).json(result)
    } else {
      result.success = true
      result.message = results.rowCount+' data found'
      if(results.rowCount > 0){
        result.data = results.rows
      } else {
        result.message = 'Data not found'
        result.data = []
      }
      
      response.status(200).json(result)
    }
  })
}

const searchCompanyByName = (request, response) => {
  const input = request.body
  result.success = false
  result.data = []
  param = [null]
  if (typeof input.key !== 'undefined') {
    param = ["%"+input.key+"%"]
  }

  pool.query('SELECT company_id, company_code, company_name, company_address FROM company WHERE company_name LIKE $1 AND is_deleted = false',param, (error, results) => {
    
    if (error) {
      result.message = 'Invalid Key'
      response.status(400).json(result)
    } else {
      result.success = true
      result.message = results.rowCount+' data found'
      if(results.rowCount > 0){
        result.data = results.rows
      } else {
        result.message = 'Data not found'
        result.data = []
      }
      
      response.status(200).json(result)
    }
  })
}

const createCompany = (request, response) => {
  const input = request.body
  result.success = false
  result.data = []
  pool.query('SELECT company_code FROM company WHERE company_code = $1 AND is_deleted = false', [input.company_code], (error, getById) => {
    
    if(getById.rowCount > 0) {
      result.message = `Company code : ${input.company_code} is already exist `
      return response.status(400).json(result);

    } else {
      let param = [input.company_code, input.company_name, input.company_address,null]
      if (typeof input.parent_id !== 'undefined') {
        param = [input.company_code, input.company_name, input.company_address, input.parent_id]
      }

      pool.query('INSERT INTO company (company_code, company_name, company_address, parent_id) VALUES ($1, $2, $3, $4)', param, (error) => {
        if (error) {
          result.message = 'Failed creating company'
          response.status(400).json(result)
        }
        
        result.success = true
        result.message = 'Company Data Added'
        result.data = request.body
        return response.status(200).json(result)
      })
    }
  })
  
}


const updateCompany = (request, response) => {
  const id = parseInt(request.params.id)
  const { company_name, company_address } = request.body
  result.success = false
  result.message = ''
  result.data = []
  pool.query(
    'UPDATE company SET company_name = $2, company_address = $3 WHERE company_id = $1',
    [id, company_name, company_address],
    (error, results) => {
      if (error) {
        result.message = 'Invalid parameter ID'
        response.status(400).json(result)
      }
      result.success = true
      result.message = `Company modified with Company ID: ${id}`
      return response.status(200).json(result)
    }
  )
}

const deleteCompany = (request, response) => {
  const id = parseInt(request.params.id)
  result.success = false
  result.message = ''
  result.data = []
  pool.query('UPDATE company SET is_deleted = true WHERE company_id = $1', [id], (error, results) => {
    if (error) {
      result.message = 'Invalid parameter ID'
      response.status(400).json(result)
    }
    result.success = true
    result.message = `Company deleted with Company ID: ${id}`
    return response.status(200).json(result)
  })
}

module.exports = {
  getCompany,
  getCompanyByCode,
  searchCompanyByName,
  createCompany,
  updateCompany,
  deleteCompany
}
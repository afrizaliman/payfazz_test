const Pool = require('pg').Pool
const pool = new Pool({
  user: 'me',
  host: 'localhost',
  database: 'test_api',
  password: 'password',
  port: 5432,
})
var result = {}

const getCurrentEmployeeByCode = (request, response) => {
    const company_code = parseInt(request.params.company_code)
    result.success = false
    result.message = ''
    result.data = {}

    if(Number.isInteger(company_code) === false){
        result.message = `Invalid parameter Company Code `
        return response.status(400).json(result);
    } else {
        pool.query('SELECT company_code, company_name, company_address FROM company WHERE company_code = $1 AND is_deleted = false',[company_code], (error, getCompany) => {
            if (error) {
                result.message = 'Failed get data company, please try again'
                response.status(500).json(result)
            }
            if(getCompany.rowCount === 0) {
                result.message = `Company code : ${company_code} is not exist `
                return response.status(400).json(result);
      
            } else {
                result.data.company_data = getCompany.rows[0]

                pool.query('SELECT e.employee_id, e.employee_email, e.employee_id_no, e.employee_name, e.employee_phone, ce.division, ce.job_position, ce.join_date FROM company_employee as ce INNER JOIN employee e ON ce.employee_id = e.employee_id INNER JOIN company c ON ce.company_id = c.company_id WHERE c.company_code = $1 AND ce.resign_date IS NULL AND e.is_deleted = false ',[company_code], (error, getEmployee) => {
                    if (error) {
                        result.message = 'Failed get data employee, please try again'
                        response.status(500).json(result)
                    }
                    result.success = true
                    result.message = getEmployee.rowCount+' data found'
                    if(getEmployee.rowCount > 0){
                        result.data.employee_data = getEmployee.rows
                    } else {
                        result.data.employee_data = []
                    }
                    response.status(200).json(result)
                })
            }
        })
    }
}

const getEmployeeByCode = (request, response) => {
    const company_code = parseInt(request.params.company_code)
    result.success = false
    result.message = ''
    result.data = {}

    if(Number.isInteger(company_code) === false){
        result.message = `Invalid parameter Company Code `
        return response.status(400).json(result);
    } else {
        pool.query('SELECT company_code, company_name, company_address FROM company WHERE company_code = $1 AND is_deleted = false ',[company_code], (error, getCompany) => {
            if (error) {
                result.message = 'Failed get data company, please try again'
                return response.status(500).json(result)
            }
            if(getCompany.rowCount === 0) {
                result.message = `Company code : ${company_code} is not exist `
                return response.status(400).json(result);
      
            } else {
                result.data.company_data = getCompany.rows[0]

                pool.query('SELECT e.employee_id, e.employee_email, e.employee_id_no, e.employee_name, e.employee_phone, ce.division, ce.job_position, ce.join_date, ce.resign_date FROM company_employee as ce INNER JOIN employee e ON ce.employee_id = e.employee_id INNER JOIN company c ON ce.company_id = c.company_id WHERE c.company_code = $1 AND e.is_deleted = false',[company_code], (error, getEmployee) => {
                    if (error) {
                        result.message = 'Failed get data employee, please try again'
                        response.status(500).json(result)
                    }
                    
                    result.success = true
                    result.message = getEmployee.rowCount+' data found'
                    if(getEmployee.rowCount > 0){
                        getEmployee.rows.forEach(element => {
                            if(element.resign_date){
                                element.status_employee = 'Resign'
                            } else {
                                element.status_employee = 'Employee'
                            }
                        });
                        result.data.employee_data = getEmployee.rows
                    } else {
                        result.data.employee_data = []
                    }
                    response.status(200).json(result)
                })
            }
        })
    }
}

const setEmployee = (request, response) => {
    const company_id = parseInt(request.params.company_id)
    const input = request.body
    result.success = false
    result.data = {}

    if(Number.isInteger(company_id) === false){
        result.message = `Invalid parameter Company ID `
        return response.status(400).json(result);
    } else {
        pool.query('SELECT company_id, company_name, company_address FROM company WHERE company_id = $1 AND is_deleted = false ',[company_id], (error, getCompany) => {
            if (error) {
                result.message = 'Failed get data company, please try again'
                return response.status(500).json(result)
            }
            if(getCompany.rowCount === 0) {
                result.message = `Company ID : ${company_id} is not exist `
                return response.status(400).json(result);
      
            } else {
                pool.query('SELECT company_employee_id FROM company_employee WHERE company_id = $1 AND employee_id = $2 AND resign_date IS NULL',[company_id,input.employee_id], (error, getEmployeeCompany) => {
                    if (error) {
                        result.message = 'Failed get data employee'
                        response.status(500).json(result)
                    }

                    if(getEmployeeCompany.rowCount > 0) {
                        result.message = `Employee has been added `
                        return response.status(400).json(result);
              
                    } else {
                        pool.query('INSERT INTO company_employee (company_id, employee_id, division, job_position, join_date) VALUES ($1, $2, $3, $4, $5)', [company_id, input.employee_id, input.division, input.job_position, input.join_date], (error) => {
                            if (error) {
                                result.message = 'Failed set employee'
                                response.status(500).json(result)
                            }
                            
                            result.success = true
                            result.message = 'Employee Data Added to Company'
                            result.data = request.body
                            return response.status(200).json(result)
                        })
                    }
                })
            }
        })
    }
}

const updateEmployee = (request, response) => {
    const company_id = parseInt(request.params.company_id)
    const employee_id = parseInt(request.params.employee_id)
    const input = request.body
    result.success = false
    result.data = {}

    if(Number.isInteger(company_id) === false){
        result.message = `Invalid parameter Company ID `
        return response.status(400).json(result);
    } else {
        pool.query('SELECT company_id, company_name, company_address FROM company WHERE company_id = $1 AND is_deleted = false ',[company_id], (error, getCompany) => {
            if (error) {
                result.message = 'Failed get data company, please try again'
                return response.status(500).json(result)
            }
            if(getCompany.rowCount === 0) {
                result.message = `Company ID : ${company_id} is not exist `
                return response.status(400).json(result)
      
            } else {
                param = [];
                set = [];
                if (typeof input.division !== 'undefined') {
                    var key_division = param.push(input.division)
                    set_division = 'division = $'+key_division
                    set.push(set_division)
                }
                if (typeof input.job_position !== 'undefined') {
                    var key_job_position = param.push(input.job_position)
                    set_job_position = 'job_position = $'+key_job_position
                    set.push(set_job_position)
                }
                if (typeof input.join_date !== 'undefined') {
                    var key_join_date = param.push(input.join_date)
                    set_join_date = 'join_date = $'+key_join_date
                    set.push(set_join_date)
                }
                if (typeof input.resign_date !== 'undefined') {
                    var key_resign_date = param.push(input.resign_date)
                    set_resign_date = 'resign_date = $'+key_resign_date
                    set.push(set_resign_date)
                }
                set_all = set.join(',')

                pool.query('UPDATE company_employee SET '+set_all+' WHERE company_id = '+company_id+' AND employee_id = '+employee_id, param, (error) => {
                    if (error) {
                        result.message = 'Failed set employee'
                        response.status(500).json(result)
                    }
                    
                    result.success = true
                    result.message = 'Employee Data Updated'
                    result.data = request.body
                    return response.status(200).json(result)
                })
            }
        })
    }
}

const deleteEmployee = (request, response) => {
    const company_id = parseInt(request.params.company_id)
    const employee_id = parseInt(request.params.employee_id)
    result.success = false
    result.message = ''
    result.data = []
    pool.query('DELETE FROM company_employee WHERE company_id = $1 AND employee_id = $2', [company_id,employee_id], (error, results) => {
      if (error) {
        result.message = 'Invalid parameter ID'
        response.status(400).json(result)
      }
      result.success = true
      result.message = `Employee : ${employee_id} deleted with Company ID: ${company_id}`
      return response.status(200).json(result)
    })
  }

module.exports = {
    getCurrentEmployeeByCode,
    getEmployeeByCode,
    setEmployee,
    updateEmployee,
    deleteEmployee
}
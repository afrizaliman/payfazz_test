const Pool = require('pg').Pool
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'test_api',
    password: 'password',
    port: 5432,
})

var result = {}

const getEmployee = (request, response) => {
    result.success = false
    result.message = ''
    result.data = []
    pool.query('SELECT employee_id, employee_email, employee_id_no, employee_name, employee_phone FROM employee WHERE is_deleted = false ORDER BY employee_id ASC', (error, results) => {
      if (error) {
        result.message = 'Failed get data employee, please try again'
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
  
const getEmployeeByIdNo = (request, response) => {
    const id_no = parseInt(request.params.id_no)
    result.success = false
    result.data = []
    pool.query('SELECT employee_id, employee_email, employee_id_no, employee_name, employee_phone FROM employee WHERE employee_id_no = $1 AND is_deleted = false', [id_no], (error, results) => {
        if (error) {
            result.message = 'Invalid parameter ID'
            response.status(500).json(result)
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

const getPartner = (request, response) => {
  const id_no = parseInt(request.params.id_no)
  result.success = false
  result.message = ''
  result.data = []
  pool.query('SELECT e_req.employee_id, e_req.employee_email, e_req.employee_id_no, e_req.employee_name, e_req.employee_phone FROM employee_partner ep INNER JOIN employee e_req ON ep.employee_id_request = e_req.employee_id INNER JOIN employee e_app ON ep.employee_id_approved = e_app.employee_id WHERE e_app.employee_id_no = $1 UNION ALL SELECT e_app.employee_id, e_app.employee_email, e_app.employee_id_no, e_app.employee_name, e_app.employee_phone FROM employee_partner ep INNER JOIN employee e_req ON ep.employee_id_request = e_req.employee_id INNER JOIN employee e_app ON ep.employee_id_approved = e_app.employee_id WHERE e_req.employee_id_no = $1',[id_no],(error, results) => {
    if (error) {
      result.message = 'Failed get data employee, please try again'
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

const getPartnerOfPartner = (request, response) => {
  const id_no = parseInt(request.params.id_no)
  result.success = false
  result.message = ''
  result.data = []
  pool.query('SELECT e_req.employee_id, e_req.employee_email, e_req.employee_id_no, e_req.employee_name, e_req.employee_phone FROM employee_partner ep INNER JOIN employee e_req ON ep.employee_id_request = e_req.employee_id INNER JOIN employee e_app ON ep.employee_id_approved = e_app.employee_id WHERE e_app.employee_id_no = $1 UNION ALL SELECT e_app.employee_id, e_app.employee_email, e_app.employee_id_no, e_app.employee_name, e_app.employee_phone FROM employee_partner ep INNER JOIN employee e_req ON ep.employee_id_request = e_req.employee_id INNER JOIN employee e_app ON ep.employee_id_approved = e_app.employee_id WHERE e_req.employee_id_no = $1',[id_no],(error, results) => {
    if (error) {
      result.message = 'Failed get data employee, please try again'
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

const getEmployeePartnerCompany = (request, response) => {
  const id_no = parseInt(request.params.id_no)
  result.success = false
  result.message = ''
  result.data = {}

  // let cb = (resx) => {
  //   console.log(resx);
  //   return resx;
  // }
  // let x = pool.query('select * from company')
  //   .then( res=> {
  //     return cb(res)
  //   })
  //   .catch( err =>{
  //     return err
  //   })


  // return x.then( y => { return y} );

  pool.query('SELECT c.company_id, c.company_code, c.company_name, ce.division, ce.job_position, ce.join_date, ce.resign_date FROM company_employee ce, employee e, company c WHERE ce.employee_id = e.employee_id AND ce.company_id = c.company_id AND e.employee_id_no = $1',[id_no],(error, getCompany) => {
    if (error) {
      result.message = 'Failed get data company, please try again'
      response.status(500).json(result)
    }

    if(getCompany.rowCount > 0) {

      getCompany.rows.forEach(element => {
        element.partner_employee = []
        var company_id = element.company_id
        var join_date = element.join_date

        pool.query('SELECT e.employee_id, e.employee_email, e.employee_name, e.employee_id_no, e.employee_phone, ce.division, ce.job_position, ce.join_date, ce.resign_date FROM company_employee ce, employee e WHERE ce.employee_id = e.employee_id AND ce.company_id=$2 AND e.employee_id_no <> $1 AND ce.join_date >= $3',[id_no,company_id,join_date],(error, getPartnerEmployeeCompany) => {
          if (error) {
            result.message = 'Failed get data employee, please try again'
            response.status(500).json(result)
          }
          try{
            element.partner_employee = getPartnerEmployeeCompany.rows
            console.log(element)
          }catch(e){
            console.log(e)
          }
        })
      })
    } 

    result.success = true
    result.message = getCompany.rowCount+' data found'
    if(getCompany.rowCount > 0){
      result.data = getCompany.rows
    } else {
      result.message = 'Data not found'
      result.data = []
    }
    response.status(200).json(result)
  })
}

const getHistoryCompanyEmployee = (request, response) => {
  const id_no = parseInt(request.params.id_no)
  result.success = false
  result.data = {}
  pool.query('SELECT c.company_id,c.company_name, c.company_address, ce.division, ce.job_position, ce.join_date, ce.resign_date FROM company_employee ce INNER JOIN employee e ON ce.employee_id = e.employee_id INNER JOIN company c ON ce.company_id = c.company_id WHERE e.employee_id_no = $1 AND c.is_deleted = false', [id_no], (error, getCompany) => {
    if (error) {
        result.message = 'Invalid parameter ID'
        response.status(500).json(result)
    } else {
      result.success = true
      result.data.previous_company = []
      result.data.current_company = []
      if(getCompany.rowCount > 0) {
        getCompany.rows.forEach(element => {
          if(element.resign_date){
            result.data.previous_company.push(element)
          } else {
            result.data.current_company.push(element)
          }
        });
        result.message = getCompany.rowCount+' data found'
      }
      response.status(200).json(result)
    }
  })
}

const searchEmployeeByName = (request, response) => {
  const input = request.body
  result.success = false
  result.data = []
  param = [null]
  if (typeof input.key !== 'undefined') {
    param = ["%"+input.key+"%"]
  }

  pool.query('SELECT employee_id, employee_email, employee_id_no, employee_name, employee_phone FROM employee WHERE employee_name LIKE $1 AND is_deleted = false',param, (error, results) => {
    
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

const setPartner = (request, response) => {
  const input = request.body
  result.success = false
  result.data = []
  pool.query('SELECT employee_partner_id FROM employee_partner WHERE (employee_id_request = $1 AND employee_id_approved = $2) OR (employee_id_request = $2 AND employee_id_approved = $1) ', [input.employee_id_request, input.employee_id_approved], (error, getPartner) => {
    if (error) {
        console.log(error)
    }
    if(getPartner.rowCount > 0) {
      result.message = `Employee is already partner `
      return response.status(400).json(result);
    } else {
      pool.query('INSERT INTO employee_partner (employee_id_request, employee_id_approved, status) VALUES ($1, $2, 1)', [input.employee_id_request, input.employee_id_approved], (error) => {
        if (error) {
            result.message = 'Failed creating employee partner'
            response.status(500).json(result)
        }
        
        result.success = true
        result.message = 'Employee Partner Data Added'
        result.data = request.body
        return response.status(200).json(result)
      })
    }
  })
}

const createEmployee = (request, response) => {
  const input = request.body
  result.success = false
  result.data = []
  pool.query('SELECT employee_id FROM employee WHERE (employee_id_no = $1 OR employee_email = $2) AND is_deleted = false', [input.employee_id_no, input.employee_email], (error, getById) => {
    
    if(getById.rowCount > 0) {
      result.message = `ID No : ${input.employee_id_no}  or Email : ${input.employee_email}  is already exist `
      return response.status(400).json(result);
    } else {
      pool.query('INSERT INTO employee (employee_email, employee_id_no, employee_name, employee_phone) VALUES ($1, $2, $3, $4)', [input.employee_email, input.employee_id_no, input.employee_name, input.employee_phone], (error) => {
        if (error) {
            result.message = 'Failed creating employee'
            response.status(500).json(result)
        }
        
        result.success = true
        result.message = 'Employee Data Added'
        result.data = request.body
        return response.status(200).json(result)
      })
    }
  })
}


const updateEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    const { employee_email, employee_id_no, employee_name, employee_phone } = request.body
    result.success = false
    result.message = ''
    result.data = []

    pool.query('SELECT employee_id FROM employee WHERE (employee_id_no = $2 OR employee_email = $3) AND is_deleted = false AND employee_id != $1', [id, employee_id_no, employee_email], (error, checkEmailId) => {
        
        if(checkEmailId.rowCount > 0) {
            result.message = `ID No : ${employee_id_no}  or Email : ${employee_email}  is already exist `
            return response.status(400).json(result);
        } else {
            pool.query(
                'UPDATE employee SET employee_email = $2, employee_id_no = $3, employee_name = $4, employee_phone = $5 WHERE employee_id = $1',
                [id, employee_email, employee_id_no, employee_name, employee_phone],
                (error, results) => {
                if (error) {
                    result.message = 'Invalid parameter ID'
                    response.status(500).json(result)
                }
                result.success = true
                result.message = `Employee modified with Company ID: ${id}`
                return response.status(200).json(result)
                }
            )
        }
    })
}

const deleteEmployee = (request, response) => {
    const id = parseInt(request.params.id)
    result.success = false
    result.message = ''
    result.data = []
    pool.query('DELETE FROM employee WHERE employee_id = $1', [id], (error, results) => {
        if (error) {
            result.message = 'Invalid parameter ID'
            response.status(500).json(result)
        }
        result.success = true
        result.message = `Employee deleted with Company ID: ${id}`
        return response.status(200).json(result)
    })
}

module.exports = {
  getEmployee,
  getEmployeeByIdNo,
  setPartner,
  getPartner,
  getPartnerOfPartner,
  getEmployeePartnerCompany,
  getHistoryCompanyEmployee,
  searchEmployeeByName,
  createEmployee,
  updateEmployee,
  deleteEmployee
}
process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');

var server = require('../index');
var should = chai.should();
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNTU0MzUyNzM4LCJleHAiOjE1NTQ0MzkxMzh9.ufO7Gq4iuSqKb7PGcicUnitqOq7ACacv31mRT6WgHUw';

chai.use(chaiHttp);

describe('API Routes', () => {
    // Unit Test Feature Sign In
    describe('POST /v1/signIn', function() {
        it('should return json', function(done) {
            chai.request(server)
            .post('/v1/signIn')
            .send({
                username: 'admin',
                password : 'admin'
        })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.have.property('data');
                res.body.data.should.have.property('token');
                done();
            });
        });
    });

    describe('POST /v1/signIn', function() {
        it('should return json', function(done) {
            chai.request(server)
            .post('/v1/signIn')
            .send({
                password : 'admin'
        })
            .end(function(err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Username doesnt exists');
                done();
            });
        });
    });

    describe('POST /v1/signIn', function() {
        it('should return json', function(done) {
            chai.request(server)
            .post('/v1/signIn')
            .send({
                username: 'admin'
        })
            .end(function(err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Password doesnt exists');
                done();
            });
        });
    });
    // End Unit Test Feature Sign In

    // Unit Test Feature Company

    // // Insert Company
    // describe('POST /v1/company', function() {
    //     it('should return json', function(done) {
    //         chai.request(server)
    //         .post('/v1/company')
    //         .send({
    //             company_code: '111',
    //             company_name : 'Company 1',
    //             company_address : 'Jalan Company 1'
    //             })
    //         .end(function(err, res) {
    //             res.should.have.status(400);
    //             res.should.be.json;
    //             res.body.should.have.property('message');
    //             res.body.message.should.equal('Not Authorized Access');
    //             done();
    //         });
    //     });
    // });

    // describe('POST /v1/company', function() {
    //     for(let i = 1; i<=6; i++){
    //         it('should return json', function(done) {
    //             chai.request(server)
    //             .post('/v1/company')
    //             .set('Authorization', 'Bearer ' + token)
    //             .send({
    //                 company_code: i+''+i+''+i+''+i,
    //                 company_name : 'Company '+i,
    //                 company_address : 'Jalan Company '+i
    //                 })
    //             .end(function(err, res) {
    //                 res.should.have.status(200);
    //                 res.should.be.json;
    //                 done();
    //             });
    //         });
    //     }
    // });

    // // Update Company
    // describe('PATCH /v1/company', function() {
    //     it('should return json', function(done) {
    //         chai.request(server)
    //         .patch('/v1/company/1')
    //         .send({
    //             company_name : 'Company 1 A',
    //             company_address : 'Jalan Company 1 A'
    //             })
    //         .end(function(err, res) {
    //             res.should.have.status(400);
    //             res.should.be.json;
    //             res.body.should.have.property('message');
    //             res.body.message.should.equal('Not Authorized Access');
    //             done();
    //         });
    //     });
    // });

    // describe('PATCH /v1/company', function() {
    //     for(let i = 1; i<=3; i++){
    //         it('should return json', function(done) {
    //             chai.request(server)
    //             .patch('/v1/company/'+i)
    //             .set('Authorization', 'Bearer ' + token)
    //             .send({
    //                 company_name : 'Company '+i+' A',
    //                 company_address : 'Jalan Company '+i+' A'
    //                 })
    //             .end(function(err, res) {
    //                 res.should.have.status(200);
    //                 res.should.be.json;
    //                 done();
    //             });
    //         });
    //     }
    // });

    // // Delete Company
    // describe('DELETE /v1/company/1', function() {
    //     it('should return json', function(done) {
    //         chai.request(server)
    //         .delete('/v1/company/1')
    //         .end(function(err, res) {
    //             res.should.have.status(400);
    //             res.should.be.json;
    //             res.body.should.have.property('message');
    //             res.body.message.should.equal('Not Authorized Access');
    //             done();
    //         });
    //     });
    // });

    // describe('DELETE /v1/company', function() {
    //     it('should return json', function(done) {
    //         chai.request(server)
    //         .delete('/v1/company/1')
    //         .set('Authorization', 'Bearer ' + token)
    //         .end(function(err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             done();
    //         });
    //     });
    // });

    // // Get Company By Company Code
    // describe('GET /v1/company/get-by-code/2222', function() {
    //     it('should return json', function(done) {
    //         chai.request(server)
    //         .get('/v1/company/get-by-code/2222')
    //         .end(function(err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             done();
    //         });
    //     });
    // });

    //  // Get All Company 
    // describe('GET /v1/company', function() {
    //     it('should return json', function(done) {
    //         chai.request(server)
    //         .get('/v1/company')
    //         .end(function(err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             done();
    //         });
    //     });
    // });

    // // Search Company By Company Name
    // describe('POST /v1/company/search-by-name', function() {
    //     it('should return json', function(done) {
    //         chai.request(server)
    //         .post('/v1/company/search-by-name')
    //         .set('Authorization', 'Bearer ' + token)
    //         .send({
    //             key : 'Company'
    //             })
    //         .end(function(err, res) {
    //             res.should.have.status(200);
    //             res.should.be.json;
    //             done();
    //         });
    //     });
    // });
    // // End Unit Test Feature Company

    // Unit Test Feature Employee
    // Insert Employee
    describe('POST /v1/employee', function() {
        it('should return json', function(done) {
            chai.request(server)
            .post('/v1/employee')
            .send({
                employee_email: 'employee1@gmail.com',
                employee_id_no : '1111',
                employee_name : 'Employee 5',
                employee_phone : '123456789'
                })
            .end(function(err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Not Authorized Access');
                done();
            });
        });
    });

    describe('POST /v1/employee', function() {
        for(let i = 1; i<=7; i++){
            it('should return json', function(done) {
                chai.request(server)
                .post('/v1/employee')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    employee_email: 'employee'+i+'@gmail.com',
                    employee_id_no : i+''+i+''+i+''+i,
                    employee_name : 'Employee '+i,
                    employee_phone : '123456789'
                    })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
            });
        }
    });

    // Update Employee
    describe('PATCH /v1/employee', function() {
        it('should return json', function(done) {
            chai.request(server)
            .patch('/v1/employee/1')
            .send({
                employee_email: 'employee1@gmail.com',
                employee_id_no : '1111',
                employee_name : 'Employee 5',
                employee_phone : '123456789'
                })
            .end(function(err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Not Authorized Access');
                done();
            });
        });
    });

    describe('PATCH /v1/employee', function() {
        for(let i = 1; i<=2; i++){
            it('should return json', function(done) {
                chai.request(server)
                .patch('/v1/employee/'+i)
                .set('Authorization', 'Bearer ' + token)
                .send({
                    employee_email: 'employee'+i+'@gmail.com',
                    employee_id_no : i+''+i+''+i+''+i,
                    employee_name : 'Employee '+i+' A',
                    employee_phone : '123456789'
                    })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
            });
        }
    });

    // Delete Employee
    describe('DELETE /v1/employee/1', function() {
        it('should return json', function(done) {
            chai.request(server)
            .delete('/v1/employee/1')
            .end(function(err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Not Authorized Access');
                done();
            });
        });
    });

    describe('DELETE /v1/employee', function() {
        it('should return json', function(done) {
            chai.request(server)
            .delete('/v1/employee/1')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });

    // Get Employee By Employee Id No
    describe('GET /v1/employee/get-by-id-no/2222', function() {
        it('should return json', function(done) {
            chai.request(server)
            .get('/v1/employee/get-by-id-no/2222')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });

     // Get All Employee 
    describe('GET /v1/employee', function() {
        it('should return json', function(done) {
            chai.request(server)
            .get('/v1/employee')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });

    // Search Employee By Employee Name
    describe('POST /v1/employee/search-by-name', function() {
        it('should return json', function(done) {
            chai.request(server)
            .post('/v1/employee/search-by-name')
            .set('Authorization', 'Bearer ' + token)
            .send({
                key : 'Employee'
                })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });

    // Get History Company Employee By Id No
    describe('GET /v1/employee/get-history-company/2222', function() {
        it('should return json', function(done) {
            chai.request(server)
            .get('/v1/employee/get-history-company/2222')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });

    // Set Partner Employee
    describe('POST /v1/employee/set-partner', function() {
        for(let i = 2; i<=5; i++){
            for(let j = i+1; j<=7; j++){
                it('should return json', function(done) {
                    chai.request(server)
                    .post('/v1/employee/set-partner')
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        employee_id_request: i,
                        employee_id_approved : j
                        })
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    });
                });
            }
        }
    });
    // End Unit Test Feature Employee Company

    // Set Employee Company

     describe('POST /v1/company/set-employee/:company_id', function() {
        it('should return json', function(done) {
            chai.request(server)
            .post('/v1/company/set-employee/2')
            .send({
                employee_id: '2',
                division : 'RnD ',
                job_position : 'Senior Engineer ',
                join_date : '2019-02-01'
                })
            .end(function(err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Not Authorized Access');
                done();
            });
        });
    });

     describe('POST /v1/company/set-employee/:company_id', function() {
        for(let i = 2; i<=6; i++){
            for(let j = i; j<=7; j++){
                it('should return json', function(done) {
                    chai.request(server)
                    .post('/v1/company/set-employee/'+i)
                    .set('Authorization', 'Bearer ' + token)
                    .send({
                        employee_id: j,
                        division : 'RnD '+j,
                        job_position : 'Senior Engineer '+i,
                        join_date : '2019-02-'+i
                        })
                    .end(function(err, res) {
                        res.should.have.status(200);
                        res.should.be.json;
                        done();
                    });
                });
            }
        }
    });

    // Update Employee Company
    describe('PATCH /v1/company/update-employee/:company_id/:employee_id', function() {
        it('should return json', function(done) {
            chai.request(server)
            .patch('/v1/company/update-employee/2/2')
            .end(function(err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Not Authorized Access');
                done();
            });
        });
    });

     describe('PATCH /v1/company/update-employee/:company_id/:employee_id', function() {
        it('should return json', function(done) {
            chai.request(server)
            .patch('/v1/company/update-employee/2/2')
            .set('Authorization', 'Bearer ' + token)
            .send({
                division : 'RnD Update',
                job_position : 'Senior Engineer Update',
                join_date : '2019-02-01',
                resign_date : '2019-10-02',
                })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });

    // Delete Employee Company
    describe('DELETE /v1/company/delete-employee/:company_id/:employee_id', function() {
        it('should return json', function(done) {
            chai.request(server)
            .delete('/v1/company/delete-employee/2/5')
            .end(function(err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Not Authorized Access');
                done();
            });
        });
    });

     describe('DELETE /v1/company/delete-employee/:company_id/:employee_id', function() {
        it('should return json', function(done) {
            chai.request(server)
            .delete('/v1/company/delete-employee/2/5')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });
});

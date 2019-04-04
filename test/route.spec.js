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

    // Insert Company
    describe('POST /v1/company', function() {
        it('should return json', function(done) {
            chai.request(server)
            .post('/v1/company')
            .send({
                company_code: '111',
                company_name : 'Company 1',
                company_address : 'Jalan Company 1'
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

    describe('POST /v1/company', function() {
        for(let i = 1; i<=6; i++){
            it('should return json', function(done) {
                chai.request(server)
                .post('/v1/company')
                .set('Authorization', 'Bearer ' + token)
                .send({
                    company_code: i+''+i+''+i+''+i,
                    company_name : 'Company '+i,
                    company_address : 'Jalan Company '+i
                    })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
            });
        }
    });

    // Update Company
    describe('PATCH /v1/company', function() {
        it('should return json', function(done) {
            chai.request(server)
            .patch('/v1/company/1')
            .send({
                company_name : 'Company 1 A',
                company_address : 'Jalan Company 1 A'
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

    describe('PATCH /v1/company', function() {
        for(let i = 1; i<=3; i++){
            it('should return json', function(done) {
                chai.request(server)
                .patch('/v1/company/'+i)
                .set('Authorization', 'Bearer ' + token)
                .send({
                    company_name : 'Company '+i+' A',
                    company_address : 'Jalan Company '+i+' A'
                    })
                .end(function(err, res) {
                    res.should.have.status(200);
                    res.should.be.json;
                    done();
                });
            });
        }
    });

    // Delete Company
    describe('DELETE /v1/company/1', function() {
        it('should return json', function(done) {
            chai.request(server)
            .delete('/v1/company/1')
            .end(function(err, res) {
                res.should.have.status(400);
                res.should.be.json;
                res.body.should.have.property('message');
                res.body.message.should.equal('Not Authorized Access');
                done();
            });
        });
    });

    describe('DELETE /v1/company', function() {
        it('should return json', function(done) {
            chai.request(server)
            .delete('/v1/company/1')
            .set('Authorization', 'Bearer ' + token)
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });

    // Get Company By Company Code
    describe('GET /v1/company/get-by-code/2222', function() {
        it('should return json', function(done) {
            chai.request(server)
            .get('/v1/company/get-by-code/2222')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });

     // Get All Company 
    describe('GET /v1/company', function() {
        it('should return json', function(done) {
            chai.request(server)
            .get('/v1/company')
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });

    // Search Company By Company Name
    describe('POST /v1/company/search-by-name', function() {
        it('should return json', function(done) {
            chai.request(server)
            .post('/v1/company/search-by-name')
            .set('Authorization', 'Bearer ' + token)
            .send({
                key : 'Company'
                })
            .end(function(err, res) {
                res.should.have.status(200);
                res.should.be.json;
                done();
            });
        });
    });
    // End Unit Test Feature Company
});

process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var assert = require('assert');

var server = require('../index');
var should = chai.should();

chai.use(chaiHttp);

describe('API Routes', () => {

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
});

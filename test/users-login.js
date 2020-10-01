process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Users, Login', () => {
    before((done) => {
        chai.request(server)
            .post('/register')
            .send({
                _method: 'post',
                firstname: 'test',
                lastname: 'testsson',
                email: 'testlogin@test.com',
                password: 'test123',
                birthdate: '1993-06-28',
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });
    it('POST /register, 200 Login', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                _method: 'post',
                email: 'testlogin@test.com',
                password: 'test123',
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.data.token.should.be.an('string');
                res.body.data.user.email.should.be.an('string');
                done();
            });
    });

    it('POST /register, 401 Login with wrong password', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                _method: 'post',
                email: 'testlogin@test.com',
                password: 'test1234',
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.errors.detail.should.be.an('string');
                done();
            });
    });

    it('POST /register, 401 Login with wrong email', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                _method: 'post',
                email: 'test@test.com',
                password: 'test123',
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.errors.detail.should.be.an('string');
                done();
            });
    });

    it('POST /register, 401 Login with missing password', (done) => {
        chai.request(server)
            .post('/login')
            .send({
                _method: 'post',
                email: 'testlogin@test.com',
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.errors.detail.should.be.an('string');
                done();
            });
    });
});

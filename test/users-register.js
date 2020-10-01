process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');

chai.should();

chai.use(chaiHttp);

describe('Users, Register', () => {
    it('POST /register, 201 Register new user', (done) => {
        chai.request(server)
            .post('/register')
            .set('Content-Type', 'Application/json')
            .send({
                _method: 'post',
                firstname: 'test',
                lastname: 'testsson',
                email: 'testregister@test.com',
                password: 'test123',
                birthdate: '1993-06-28',
            })
            .end((err, res) => {
                res.should.have.status(201);
                done();
            });
    });

    it('POST /register, 401 Register with no email', (done) => {
        chai.request(server)
            .post('/register')
            .set('Content-Type', 'Application/json')
            .send({
                _method: 'post',
                firstname: 'test',
                lastname: 'testsson',
                password: 'test123',
                birthdate: '1993-06-28',
            })
            .end((err, res) => {
                res.should.have.status(401);
                done();
            });
    });
});

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app.js');
try {
    config = require('../config/config.json');
} catch (error) {
    console.error(error);
}
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || config.secret;
const payload = { email: 'test@test.com' };
const tempToken = jwt.sign(payload, secret, { expiresIn: '1h' });

chai.should();

chai.use(chaiHttp);

describe('Reports', () => {
    before((done) => {
        chai.request(server)
            .post('/reports')
            .set({
                'x-access-token': tempToken,
                'Content-type': 'Application/json',
            })
            .send({
                _method: 'post',
                kmom: "kmom01",
                kmomText: 'This is a test report for kmom01',
            })
            .end((err, res) => {
                res.should.have.status(201);
                if (err) {
                    throw new Error('die');
                } else {
                    done();
                }
            });
    });
    it('GET /reports/week/1, 200 Get report', (done) => {
        chai.request(server)
            .get('/reports/week/1')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.an('object');
                res.body.data.texts.should.equal('This is a test report for kmom01');
                res.body.data.kmom.length.should.be.above(0);
                done();
            });
    });

    it('GET /reports/week/12, 401 No report', (done) => {
        chai.request(server)
            .get('/reports/week/12')
            .end((err, res) => {
                res.should.have.status(401);
                res.should.be.an('object');
                done();
            });
    });

    it('POST /reports/week/2, 200 Create report', (done) => {
        chai.request(server)
            .post('/reports')
            .set({
                'x-access-token': tempToken,
                'Content-type': 'Application/json',
            })
            .send({
                _method: 'post',
                kmom: "kmom02",
                kmomText: 'This is a test report for kmom02',
            })
            .end((err, res) => {
                res.should.have.status(201);
                chai.request(server)
                    .get('/reports/week/2')
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.should.be.an('object');
                        res.body.data.texts.should.equal('This is a test report for kmom02');
                        res.body.data.kmom.length.should.be.above(0);
                    });

                done();
            });
    });

    it('POST /reports, 500 No text', (done) => {
        chai.request(server)
            .post('/reports')
            .set({
                'x-access-token': tempToken,
                'Content-type': 'Application/json',
            })
            .send({
                _method: 'post',
                kmom: "kmom03",
            })
            .end((err, res) => {
                res.should.have.status(500);
                res.should.be.an('object');
                done();
            });
    });

    it('POST /reports, 401 No auth token', (done) => {
        chai.request(server)
            .post('/reports')
            .send({
                _method: 'post',
                kmom: "kmom03",
                kmomText: 'This is a test report for kmom03',
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.should.be.an('object');
                done();
            });
    });

    after(() => {});
});

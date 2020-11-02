const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/server');

// Configure chai
require("chai").should();
chai.use(chaiHttp);

describe("Server lib", () => {

  describe("Authentication success", () => { 
    
    it('Login user success', done => {

      const data = {
        email: 'enya@email.com',
        password: '123',
      }

      chai.request(app)
      .post('/auth')
      .send(data)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object')
        res.body.should.have.property('user');
        res.body.user.should.be.a('object');
        res.body.user.should.have.property('_id');
        res.body.should.have.property('token');
        done();
      })

    });

    it('Login user error - email', done => {

      const data = {
        email: 'enya1@email.com',
        password: '123',
      }

      chai.request(app)
      .post('/auth')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Usuário não encontrado.');
        done();
      })
    });

    it('Login user error - password', done => {

      const data = {
        email: 'enya@email.com',
        password: '1235',
      }

      chai.request(app)
      .post('/auth')
      .send(data)
      .end((err, res) => {
        res.should.have.status(400);
        res.body.should.be.a('object');
        res.body.should.have.property('message').eql('Senha inválida.');
        done();
      })
    });

  });
});
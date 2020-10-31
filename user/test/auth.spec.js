const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../src/server');

// Configure chai
require("chai").should();
chai.use(chaiHttp);

describe("Server lib", () => {

  describe("Authentication success", () => { 
    let idUserCreatedForTest;
    let token;
    
    beforeEach(function(done) {
      this.timeout(3000); // A very long environment setup.
      setTimeout(done, 2500);
    });
    
    it('it should POST one user', done => {
      chai.request(app)
        .post('/users')
        .field('name', 'franklin d')
        .field('birth_date', '123345756')
        .field('email', 'testemochaauth@user.com')
        .field('password', 'password')
        .attach('avatar', fs.readFileSync('/home/enya/Imagens/girf.jpg'), 'teste_mocha.jpg')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('message').eql('Usuário cadastrado com sucesso.');
          res.body.should.have.property('token');
          idUserCreatedForTest = res.body.id;
          done();
        })
    });

    it("it should POST authentication one user", (done) => {
      const dataUser = {
        email: 'testemochaauth@user.com',
        password: 'password',
      }
      chai.request(app)
        .post('/auth')
        .send(dataUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.should.have.property('user')
          res.body.user.should.have.property('_id');
          res.body.user.should.have.property('avatar');
          res.body.user.should.have.property('name');
          res.body.user.should.have.property('birth_date');
          res.body.user.should.have.property('email');
          res.body.user.should.have.property('password');
          res.body.should.have.property('token');
          idUserCreatedForTest = res.body.user._id;
          token = res.body.token;
          done();
        })
    });

    it("it should DELETE one user", (done) => {
      const id = idUserCreatedForTest;
      chai.request(app)
        .delete(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Membro deletado.');
            done();
        })
    });

  });
});
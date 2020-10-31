const fs = require('fs');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const app = require('../src/server');

// Configure chai
require("chai").should();
chai.use(chaiHttp);

describe("Server lib", () => {

  describe("User success", () => { 
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
        .field('email', 'testemocha@user.com')
        .field('password', 'password')
        .attach('avatar', fs.readFileSync('/home/enya/Imagens/girf.jpg'), 'teste_mocha.jpg')
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('id');
          res.body.should.have.property('message').eql('Usuário cadastrado com sucesso.');
          res.body.should.have.property('token');
          idUserCreatedForTest = res.body.id;
          token = res.body.token;
          done();
        })
    });

    it("it should GET all user", (done) => {
      chai.request(app)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          res.body.map(user => {
            user.should.have.property('_id');
            user.should.have.property('avatar');
            user.should.have.property('name');
            user.should.have.property('birth_date');
            user.should.have.property('email');
            user.should.have.property('password');
          });
          res.body.length.should.be.eql(1);
          done();
        })
    });

    it("it should PUT one user", (done) => {
      const id = idUserCreatedForTest;
      chai.request(app)
        .put(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .field('name', 'franklin')
        .field('birth_date', '12334575')
        .field('email', 'testmocha@user.com')
        .field('password', 'password123')
        .attach('avatar', fs.readFileSync('/home/enya/Imagens/girf.jpg'), 'tesmocha.jpg')
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.have.property('message').eql('Usuário atualizado com sucesso.');
            done();
        })
    });

    it("it should GET one user", (done) => {
      const id = idUserCreatedForTest;
      chai.request(app)
        .get(`/users/${id}`)
        .set('Authorization', `Bearer ${token}`)
        .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('_id');
            res.body.should.have.property('avatar');
            res.body.should.have.property('name');
            res.body.should.have.property('birth_date');
            res.body.should.have.property('email');
            res.body.should.have.property('password');
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
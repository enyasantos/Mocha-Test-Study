const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const server = require('../src/service');

// Configure chai
require("chai").should();
chai.use(chaiHttp);

describe("Agents lib", () => {
    describe("Agents", () => {
        it("it should GET all the agents", (done) => {
            chai.request(server)
                .get('/agents')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    //res.body.length.should.be.eql(3);
                    done();
                })
        });
        it("it should POST one agent", (done) => {
            const agent = {
                name: "Reyna",
                nationality: "México",
                role: "Duelista",
                skills: [
                    "Dismiss",
                    "Devour",
                    "Leer",
                    "Empress"
                ],
                image: "reyna.png"
            }
            const urlImage = `http://localhost:3001/image/agents/${agent.image}`;
            chai.request(server)
                .post('/agents')
                .send(agent)
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.be.a('object');
                    res.body.should.have.property('name').eql(agent.name);
                    res.body.should.have.property('nationality').eql(agent.nationality);
                    res.body.should.have.property('role').eql(agent.role);
                    res.body.should.have.property('skills').eql(agent.skills);
                    res.body.should.have.property('image').eql(urlImage);
                    done();
                });
        });
        it("it should GET one agent", (done) => {
            const name = "Killjoy";
            const id = 'oheu3dish';
            chai.request(server)
                .get(`/agent/${name}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql(id);
                    res.body.should.have.property('name');
                    res.body.should.have.property('nationality');
                    res.body.should.have.property('role');
                    res.body.should.have.property('skills');
                    res.body.should.have.property('image');
                    done();
                })
        });
        it("it should DELETE one agent", (done) => {
            const id = 'po2n0gb49';
            chai.request(server)
                .delete(`/agents/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('message').eql('Deletado com sucesso.');
                    done();
                })
        });
        it("it should PUT one agent", (done) => {
            const updateAgent = {
                name: "Reyna Update",
                nationality: "México",
                role: "Duelista",
                skills: [
                  "Dismiss",
                  "Devour",
                  "Leer",
                  "Empress"
                ],
                image: "reyna.png"
            };
            const urlImage = `http://localhost:3001/image/agents/${updateAgent.image}`;
            const id = '89dm2t93j';
            chai.request(server)
                .put(`/agents/${id}`)
                .send(updateAgent)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('id').eql(id);
                    res.body.should.have.property('name').eql(updateAgent.name);
                    res.body.should.have.property('nationality').eql(updateAgent.nationality);
                    res.body.should.have.property('role').eql(updateAgent.role);
                    res.body.should.have.property('skills').eql(updateAgent.skills);
                    res.body.should.have.property('image').eql(urlImage);
                    done();
                })
        });
    })
});
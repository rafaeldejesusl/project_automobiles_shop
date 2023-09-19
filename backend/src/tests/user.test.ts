import chai from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";

import { app } from "../app";
import { clientMock } from "./support/mock";
import connectionSource from "../database";
import { User } from "../entities/User";

chai.use(chaiHttp);

const { expect } = chai;
const repositoryUser = connectionSource.getRepository(User);

describe('Entity User', () => {
  before(() => {
    sinon.stub(repositoryUser, 'create').resolves(clientMock);
    sinon.stub(repositoryUser, 'save').resolves();
  });

  after(() => {
    (repositoryUser.create as sinon.SinonStub).restore();
    (repositoryUser.save as sinon.SinonStub).restore();
  });

  it('Método POST /client com sucesso', async () => {
    const response = await chai.request(app).post('/client').send({
      email: clientMock.email,
      password: clientMock.password,
      first_name: clientMock.first_name,
      last_name: clientMock.last_name,
      cpf: clientMock.cpf
    });
    expect(response.status).to.be.equal(201);
  });

  it('Método POST /client sem email', async () => {
    const response = await chai.request(app).post('/client').send({
      password: clientMock.password,
      first_name: clientMock.first_name,
      last_name: clientMock.last_name,
      cpf: clientMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid email');
  });

  it('Método POST /client com email inválido', async () => {
    const response = await chai.request(app).post('/client').send({
      email: 'joaoemail.com',
      password: clientMock.password,
      first_name: clientMock.first_name,
      last_name: clientMock.last_name,
      cpf: clientMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid email');
  });

  it('Método POST /client sem senha', async () => {
    const response = await chai.request(app).post('/client').send({
      email: clientMock.email,
      first_name: clientMock.first_name,
      last_name: clientMock.last_name,
      cpf: clientMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid password');
  });

  it('Método POST /client com senha inválida', async () => {
    const response = await chai.request(app).post('/client').send({
      email: clientMock.email,
      password: '123',
      first_name: clientMock.first_name,
      last_name: clientMock.last_name,
      cpf: clientMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid password');
  });

  it('Método POST /client sem primeiro nome', async () => {
    const response = await chai.request(app).post('/client').send({
      email: clientMock.email,
      password: clientMock.password,
      last_name: clientMock.last_name,
      cpf: clientMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid first name');
  });

  it('Método POST /client com primeiro nome inválido', async () => {
    const response = await chai.request(app).post('/client').send({
      email: clientMock.email,
      password: clientMock.password,
      first_name: 'q',
      last_name: clientMock.last_name,
      cpf: clientMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid first name');
  });

  it('Método POST /client sem último nome', async () => {
    const response = await chai.request(app).post('/client').send({
      email: clientMock.email,
      password: clientMock.password,
      first_name: clientMock.first_name,
      cpf: clientMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid last name');
  });

  it('Método POST /client com último nome inválido', async () => {
    const response = await chai.request(app).post('/client').send({
      email: clientMock.email,
      password: clientMock.password,
      first_name: clientMock.first_name,
      last_name: 'q',
      cpf: clientMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid last name');
  });

  it('Método POST /client com cpf inválido', async () => {
    const response = await chai.request(app).post('/client').send({
      email: clientMock.email,
      password: clientMock.password,
      first_name: clientMock.first_name,
      last_name: clientMock.last_name,
      cpf: '000'
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid cpf');
  });
});
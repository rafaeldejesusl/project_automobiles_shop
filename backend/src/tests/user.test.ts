import chai from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";

import { app } from "../app";
import { clientMock, sellerMock } from "./support/mock";
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

  it('Método POST /client sem cpf', async () => {
    const response = await chai.request(app).post('/client').send({
      email: clientMock.email,
      password: clientMock.password,
      first_name: clientMock.first_name,
      last_name: clientMock.last_name
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid cpf');
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

describe('Entity User', () => {
  before(() => {
    sinon.stub(jwt, 'verify').resolves();
    sinon.stub(repositoryUser, 'create').resolves(sellerMock);
    sinon.stub(repositoryUser, 'save').resolves();
  });

  after(() => {
    (jwt.verify as sinon.SinonStub).restore();
    (repositoryUser.create as sinon.SinonStub).restore();
    (repositoryUser.save as sinon.SinonStub).restore();
  });

  it('Método POST /seller com sucesso', async () => {
    const response = await chai.request(app).post('/seller').set('authorization', 'token').send({
      email: sellerMock.email,
      password: sellerMock.password,
      first_name: sellerMock.first_name,
      last_name: sellerMock.last_name,
      cpf: sellerMock.cpf
    });
    expect(response.status).to.be.equal(201);
  });

  it('Método POST /seller sem email', async () => {
    const response = await chai.request(app).post('/seller').set('authorization', 'token').send({
      password: sellerMock.password,
      first_name: sellerMock.first_name,
      last_name: sellerMock.last_name,
      cpf: sellerMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid email');
  });

  it('Método POST /seller com email inválido', async () => {
    const response = await chai.request(app).post('/seller').set('authorization', 'token').send({
      email: 'joaoemail.com',
      password: sellerMock.password,
      first_name: sellerMock.first_name,
      last_name: sellerMock.last_name,
      cpf: sellerMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid email');
  });

  it('Método POST /seller sem senha', async () => {
    const response = await chai.request(app).post('/seller').set('authorization', 'token').send({
      email: sellerMock.email,
      first_name: sellerMock.first_name,
      last_name: sellerMock.last_name,
      cpf: sellerMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid password');
  });

  it('Método POST /seller com senha inválida', async () => {
    const response = await chai.request(app).post('/seller').set('authorization', 'token').send({
      email: sellerMock.email,
      password: '123',
      first_name: sellerMock.first_name,
      last_name: sellerMock.last_name,
      cpf: sellerMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid password');
  });

  it('Método POST /seller sem primeiro nome', async () => {
    const response = await chai.request(app).post('/seller').set('authorization', 'token').send({
      email: sellerMock.email,
      password: sellerMock.password,
      last_name: sellerMock.last_name,
      cpf: sellerMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid first name');
  });

  it('Método POST /seller com primeiro nome inválido', async () => {
    const response = await chai.request(app).post('/seller').set('authorization', 'token').send({
      email: sellerMock.email,
      password: sellerMock.password,
      first_name: 'q',
      last_name: sellerMock.last_name,
      cpf: sellerMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid first name');
  });

  it('Método POST /seller sem último nome', async () => {
    const response = await chai.request(app).post('/seller').set('authorization', 'token').send({
      email: sellerMock.email,
      password: sellerMock.password,
      first_name: sellerMock.first_name,
      cpf: sellerMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid last name');
  });

  it('Método POST /seller com último nome inválido', async () => {
    const response = await chai.request(app).post('/seller').set('authorization', 'token').send({
      email: sellerMock.email,
      password: sellerMock.password,
      first_name: sellerMock.first_name,
      last_name: 'q',
      cpf: sellerMock.cpf
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid last name');
  });

  it('Método POST /seller sem cpf', async () => {
    const response = await chai.request(app).post('/seller').set('authorization', 'token').send({
      email: sellerMock.email,
      password: sellerMock.password,
      first_name: sellerMock.first_name,
      last_name: sellerMock.last_name
    });
    expect(response.status).to.be.equal(400);
    expect(response.body.message).to.be.equal('Invalid cpf');
  });
});

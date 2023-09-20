import chai from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";

import { app } from "../app";
import { adminMock } from "./support/mock";
import connectionSource from "../database";
import { Admin } from "../entities/Admin";
import { User } from "../entities/User";

chai.use(chaiHttp);

const { expect } = chai;
const repositoryAdmin = connectionSource.getRepository(Admin);
const repositoryUser = connectionSource.getRepository(User);

describe('Entity Admin', () => {
  before(() => {
    sinon.stub(repositoryAdmin, 'findOne').resolves(adminMock);
    sinon.stub(repositoryUser, 'findOne').resolves(null);
    sinon.stub(jwt, 'sign').callsFake((_payload, _secret) => {
      return 'token';
    });
  });

  after(() => {
    (repositoryAdmin.findOne as sinon.SinonStub).restore();
    (repositoryUser.findOne as sinon.SinonStub).restore();
    (jwt.sign as sinon.SinonStub).restore();
  });

  it('Método POST /login com sucesso', async () => {
    const response = await chai.request(app).post('/login')
      .send({ email: adminMock.email, password: adminMock.password });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal('token');
  });

  it('Método POST /login com senha incorreta', async () => {
    const response = await chai.request(app).post('/login')
      .send({ email: adminMock.email, password: 'test' });
    expect(response.status).to.be.equal(400)
    expect(response.body.message).to.be.equal('Invalid email or password');
  });

  it('Método POST /login com email incorreto', async () => {
    (repositoryAdmin.findOne as sinon.SinonStub).restore();
    sinon.stub(repositoryAdmin, 'findOne').resolves(null);
    
    const response = await chai.request(app).post('/login')
      .send({ email: 'test', password: adminMock.password });
    expect(response.status).to.be.equal(400)
    expect(response.body.message).to.be.equal('Invalid email or password');
  });
});

import chai from "chai";
import sinon from "sinon";
import chaiHttp from "chai-http";
import jwt from "jsonwebtoken";

import { app } from "../app";
import { adminMock } from "./support/mock";
import connectionSource from "../database";
import { Admin } from "../entities/Admin";

chai.use(chaiHttp);

const { expect } = chai;
const repositoryAdmin = connectionSource.getRepository(Admin);

describe('Entity Admin', () => {
  before(() => {
    sinon.stub(repositoryAdmin, 'find').resolves([adminMock]);
    sinon.stub(jwt, 'sign').callsFake((_payload, _secret) => {
      return 'token';
    });
  });

  after(() => {
    (repositoryAdmin.find as sinon.SinonStub).restore();
    (jwt.sign as sinon.SinonStub).restore();
  });

  it('Método POST /login com sucesso', async () => {
    const response = await chai.request(app).post('/login')
      .send({ email: adminMock.email, password: adminMock.password });
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.equal('token');
  })
});

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

  it('Método POST /client cria cliente com sucesso', async () => {
    const response = await chai.request(app).post('/client').send({
      email: clientMock.email,
      password: clientMock.password,
      first_name: clientMock.first_name,
      last_name: clientMock.last_name,
      cpf: clientMock.cpf
    });
    expect(response.status).to.be.equal(201);
  });
});
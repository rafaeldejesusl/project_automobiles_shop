import { Repository } from 'typeorm';
import { IUserRequest, IUserService } from '../protocols';
import { User } from '../entities/User';
import connectionSource from '../database';

export default class UserService implements IUserService {
  repositoryUser: Repository<User>

  constructor() {
    this.repositoryUser = connectionSource.getRepository(User);
  }

  async createClient(client: IUserRequest): Promise<User> {
    const { email, password, first_name, last_name, cpf } = client;

    const newClient = this.repositoryUser.create({
      email: email,
      password: password,
      first_name: first_name,
      last_name: last_name,
      cpf: cpf,
      type: 'client'
    });
    await this.repositoryUser.save(newClient);

    return newClient;
  }
}
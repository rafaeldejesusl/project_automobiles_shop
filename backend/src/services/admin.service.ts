import { Repository } from 'typeorm';
import { IAdminRequest, IAdminService } from '../protocols';
import { Admin } from '../entities/Admin';
import connectionSource from '../database';
import { User } from '../entities/User';

export default class AdminService implements IAdminService {
  repositoryAdmin: Repository<Admin>
  repositoryUser: Repository<User>

  constructor() {
    this.repositoryAdmin = connectionSource.getRepository(Admin);
    this.repositoryUser = connectionSource.getRepository(User);
  }

  async login(admin: IAdminRequest): Promise<Admin | null> {
    const { email, password } = admin;
    const storedAdmin = await this.repositoryAdmin.findOne({ where: { email } });
    const storedUser = await this.repositoryUser.findOne({ where: { email } });

    if (!storedAdmin && !storedUser) {
      return null;
    }

    if (storedAdmin && storedAdmin.password === password) {
      return storedAdmin;
    }

    if (storedUser && storedUser.password === password) {
      return storedUser;
    }

    return null;
  }
}
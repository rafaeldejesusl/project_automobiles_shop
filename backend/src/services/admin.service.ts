import { Repository } from 'typeorm';
import { IAdminRequest, IAdminService } from '../protocols';
import { Admin } from '../entities/Admin';
import connectionSource from '../database';

export default class AdminService implements IAdminService {
  repositoryAdmin: Repository<Admin>

  constructor() {
    this.repositoryAdmin = connectionSource.getRepository(Admin);
  }

  async login(admin: IAdminRequest): Promise<Admin | null> {
    const { email, password } = admin;
    const storedAdmin = await this.repositoryAdmin.findOne({ where: { email } });

    if (!storedAdmin) {
      return null;
    }

    if (storedAdmin.password !== password) {
      return null;
    }

    return storedAdmin;
  }
}
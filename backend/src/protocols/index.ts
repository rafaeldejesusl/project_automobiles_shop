import { Admin } from '../entities/Admin';

export interface IAdminRequest {
  email: string,
  password: string
}

export interface IAdminService {
  login(admin: IAdminRequest): Promise<Admin | null>
}
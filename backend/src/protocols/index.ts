import { Admin } from '../entities/Admin';
import { User } from '../entities/User';

export interface IAdminRequest {
  email: string,
  password: string
}

export interface IAdminService {
  login(admin: IAdminRequest): Promise<Admin | null>
}

export interface IUserRequest {
  email: string,
  password: string,
  first_name: string,
  last_name: string,
  cpf: string
}

export interface IUserService {
  createClient(client: IUserRequest): Promise<User>
  createSeller(seller: IUserRequest): Promise<User>
  deleteSeller(email: string): Promise<User | null>
}

export interface IJwtPayload {
  id: number,
  email: string,
  type: string
}
import { Request, Response, NextFunction } from 'express';
import { IUserService } from '../protocols/index';

export default class UserController {
  constructor(private service:IUserService) {
    this.service;
  }

  async createClient(req: Request, res: Response, _next: NextFunction) {
    try {
      const { email, password, first_name, last_name, cpf } = req.body;

      await this.service.createClient({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        cpf: cpf
      });

      return res.status(201).end();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async createSeller(req: Request, res: Response, _next: NextFunction) {
    try {
      const { email, password, first_name, last_name, cpf } = req.body;

      await this.service.createSeller({
        email: email,
        password: password,
        first_name: first_name,
        last_name: last_name,
        cpf: cpf
      });

      return res.status(201).end();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async deleteSeller(req: Request, res: Response, _next: NextFunction) {
    try {
      const { id } = req.params;

      const deleted = await this.service.deleteSeller(parseInt(id));

      if (!deleted) {
        return res.status(400).json({ message: 'Invalid id' });
      }

      return res.status(204).end();
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
import { NextFunction, Request, Response } from "express";
import { IAdminService } from "../protocols/index";
import generateJWT from "../utils/generateJWT";

export default class AdminController {
  constructor(private service: IAdminService) {
    this.service;
  }

  async login(req: Request, res: Response, _next: NextFunction) {
    try {
      const { email, password } = req.body;
      const admin = await this.service.login({ email, password });
      
      if (!admin) {
        return res.status(400).json({ message: "Invalid email or password" });
      }
      
      const token = generateJWT({ email, type: admin.type });
      return res.status(200).json(token);
    } catch (error) {
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

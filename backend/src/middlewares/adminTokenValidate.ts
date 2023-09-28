import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { Admin } from '../entities/Admin';

const secret = process.env.JWT_SECRET || "suaSenhaSecreta";

export default async function adminTokenValidate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token is required' });

  try {
    let payload = jwt.verify(authorization, secret);
    payload = payload as Admin;

    if (payload.type !== 'admin') {
      return res.status(403).json({ message: 'You are not allowed' })
    }
    res.locals.user = payload;

    return next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
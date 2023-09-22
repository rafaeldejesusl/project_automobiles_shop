import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret = process.env.JWT_SECRET || "suaSenhaSecreta";

export default async function adminTokenValidate(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token is required' });

  try {
    const payload = jwt.verify(authorization, secret);
    res.locals.user = payload;

    return next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}
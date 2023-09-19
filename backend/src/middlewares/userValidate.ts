import { Request, Response, NextFunction } from 'express';

const regexEmail = /^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;

export default async function userValidate(req: Request, res: Response, next: NextFunction) {
  const { email, password, first_name, last_name, cpf } = req.body;

  if (!email || !regexEmail.test(email)) {
    return res.status(400).json({ message: 'Invalid email' });
  }

  if (!password || password.length < 6 ) {
    return res.status(400).json({ message: 'Invalid password' });
  }

  if (!first_name || first_name.length < 3) {
    return res.status(400).json({ message: 'Invalid first name' });
  }

  if (!last_name || last_name.length < 3) {
    return res.status(400).json({ message: 'Invalid last name' });
  }

  if (!cpf || cpf.length !== 11) {
    return res.status(400).json({ message: 'Invalid cpf' });
  }

  return next();
}
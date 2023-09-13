import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';

const userRouter = Router();
const service = new UserService();
const controller = new UserController(service);

userRouter.post('/client', (req, res, next) => {
  controller.createClient(req, res, next);
});

export default userRouter;
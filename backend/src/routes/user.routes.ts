import { Router } from 'express';
import UserController from '../controllers/user.controller';
import UserService from '../services/user.service';
import userValidate from '../middlewares/userValidate';
import adminTokenValidate from '../middlewares/adminTokenValidate';

const userRouter = Router();
const service = new UserService();
const controller = new UserController(service);

userRouter.post('/client', userValidate, (req, res, next) => {
  controller.createClient(req, res, next);
});

userRouter.post('/seller', adminTokenValidate, userValidate, (req, res, next) => {
  controller.createSeller(req, res, next);
});

userRouter.delete('/seller', adminTokenValidate, (req, res, next) => {
  controller.deleteSeller(req, res, next);
});

export default userRouter;

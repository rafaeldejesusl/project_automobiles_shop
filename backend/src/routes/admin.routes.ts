import { Router } from 'express';
import AdminService from '../services/admin.service';
import AdminController from '../controllers/admin.controller';

const adminRouter = Router();
const service = new AdminService();
const controller = new AdminController(service);

adminRouter.post('/login', (req, res, next) => {
  controller.login(req, res, next);
});

export default adminRouter;

import { Router } from 'express';
import usersController from '../../controllers/users.controller';
import usersAuth from '../../middlewares/auth/users.auth';

class UsersRoutes {
  public router = Router();
  public usersController = usersController;
  public usersAuth = usersAuth;

  constructor() {}

  registerRoutes = () => {
    this.router.get('/info', this.usersAuth.authenticate, this.usersController.getUserInfo);
  };
}

const usersRoutes = new UsersRoutes();

usersRoutes.registerRoutes();

export default usersRoutes;

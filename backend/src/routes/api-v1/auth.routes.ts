import { Router } from 'express';
import authController from '../../controllers/auth.controller';
import usersValidator from '../../middlewares/validators/users.validator';
import usersAuth from '../../middlewares/auth/users.auth';

class AuthRoutes {
  public router = Router();
  public authController = authController;
  public usersValidatior = usersValidator;
  public usersAuth = usersAuth;

  constructor() {}

  registerRoutes = () => {
    this.router.post('/signup', this.usersValidatior.signupValidator, this.authController.signup);

    this.router.post('/signin', this.usersValidatior.signinValidator, this.authController.signin);

    this.router.get('/me', this.usersAuth.authenticate, this.authController.getMe);

    this.router.patch('/logout', this.usersAuth.authenticate, this.authController.logout);
  };
}

const authRoutes = new AuthRoutes();

authRoutes.registerRoutes();

export default authRoutes;

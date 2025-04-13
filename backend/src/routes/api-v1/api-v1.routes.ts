import { Router } from 'express';
import authRoutes from './auth.routes';
import ridesRoutes from './messages.routes';
import usersRoutes from './users.routes';

class ApiV1Routes {
  public router = Router();
  public authRoutes = authRoutes;
  public usersRoutes = usersRoutes;
  public ridesRoutes = ridesRoutes;

  constructor() {}

  registerRoutes = () => {
    this.router.use('/auth', this.authRoutes.router);
    this.router.use('/users', usersRoutes.router);
    this.router.use('/messages', ridesRoutes.router);
  };
}

const apiV1Routes = new ApiV1Routes();

apiV1Routes.registerRoutes();

export default apiV1Routes;

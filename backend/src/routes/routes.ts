import type { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import { ApiResponse } from '../utils/response/api-response';
import apiV1Routes from './api-v1/api-v1.routes';
import { errorHandler } from '../middlewares/handlers/error.handler';

class Routes {
  public router = Router();
  public apiV1Routes = apiV1Routes;

  constructor() {}

  registerRoutes = () => {
    this.router.use('/api/v1', apiV1Routes.router);

    this.router.use((req: Request, res: Response, next: NextFunction) => {
      res.status(404).json(new ApiResponse('Route not found.'));
    });

    this.router.use(errorHandler);
  };
}

const routes = new Routes();

routes.registerRoutes();

export default routes;

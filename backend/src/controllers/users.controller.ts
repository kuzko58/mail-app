import type { NextFunction, Request, Response } from 'express';
import usersService from '../services/users.service';
import { ApiResponse } from '../utils/response/api-response';

class UsersController {
  private usersService = usersService;

  constructor() {}

  public getUserInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.usersService.getUser(res.locals.user);

      return res.status(200).json(new ApiResponse('success', { user }));
    } catch (err) {
      next(err);
    }
  };

  public getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.usersService.getAllUsers();

      return res.status(200).json(new ApiResponse('success', { users }));
    } catch (err) {
      next(err);
    }
  };
}

const usersController = new UsersController();

export default usersController;

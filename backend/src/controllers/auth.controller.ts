import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';
import authService from '../services/auth.service';
import { ApiResponse } from '../utils/response/api-response';
import { UserDocument } from '../types/user.types';

class AuthController {
  private authService = authService;
  private cookieMaxAge = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  constructor() {}

  public signup = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.userRegistration(req.body);

      const token = await this.generateUserToken(user);

      res.cookie('_mail_app_api', token, {
        httpOnly: true,
        maxAge: this.cookieMaxAge,
      });

      return res.status(200).json(new ApiResponse('success', { user: user.toJSON() }));
    } catch (err) {
      next(err);
    }
  };

  public signin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.userLogin(req.body);

      const token = await this.generateUserToken(user);

      res.cookie('_mail_app_api', token, {
        httpOnly: true,
        maxAge: this.cookieMaxAge,
      });

      res.status(200).json(new ApiResponse('success', { user: user.toJSON() }));
    } catch (err) {
      next(err);
    }
  };

  public getMe = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await this.authService.getMe(res.locals.user);

      return res.status(200).json(new ApiResponse('success', { user }));
    } catch (err) {
      next(err);
    }
  };

  public logout = async (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('_mail_app_api', { httpOnly: true });
    res.status(200).json(new ApiResponse('success'));
  };

  private generateUserToken = async (user: UserDocument) => {
    const secretKey = new Uint8Array(user.secret.split(',').map(Number));

    return await new jose.SignJWT({
      id: user._id,
      email: user.email,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('24h')
      .sign(secretKey);
  };
}

const authController = new AuthController();

export default authController;

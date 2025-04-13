import type { NextFunction, Request, Response } from 'express';
import * as jose from 'jose';
import UsersModel from '../../models/users.model';
import { HttpError } from '../../utils/error/http-error';
import { ICookieUser } from '../../types/user.types';

class UsersAuth {
  private UsersModel = UsersModel;
  constructor() {}

  public authenticate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.cookies['_mail_app_api'];

      if (!token) {
        throw new HttpError('unauthorized!', 401);
      }

      const tokenClaimsHash = token.split('.')[1];

      const buffer = Buffer.from(tokenClaimsHash, 'base64');
      const claimsStr = buffer.toString('utf-8');
      const claims = JSON.parse(claimsStr);

      const user = await this.UsersModel.findOne({ email: claims.email });

      if (!user) {
        throw new HttpError('unauthorized!', 401);
      }

      const secret = new Uint8Array(user.secret.split(',').map(Number));

      const authenticatedClaims = await jose.jwtVerify(token, secret);

      res.locals.user = authenticatedClaims.payload as unknown as ICookieUser;

      next();
    } catch (err) {
      // JWT has expired
      if ((err as Error & { code: string }).code === 'ERR_JWT_EXPIRED') {
        return next(new HttpError('unauthorized!', 401));
      }

      next(err);
    }
  };
}

const usersAuth = new UsersAuth();

export default usersAuth;

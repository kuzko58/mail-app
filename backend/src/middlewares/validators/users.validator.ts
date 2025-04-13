import type { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import { HttpError } from '../../utils/error/http-error';

class UsersValidator {
  public signupValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      firstName: Joi.string().min(2).required(),
      lastName: Joi.string().min(2).required(),
      email: Joi.string().email().required(),
      password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new HttpError(error.details[0].message);
    }

    next();
  };

  public signinValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new HttpError(error.details[0].message);
    }

    next();
  };
}

const usersValidator = new UsersValidator();

export default usersValidator;

import Joi from 'joi';
import type { NextFunction, Request, Response } from 'express';
import { HttpError } from '../../utils/error/http-error';

class MessagesValidator {
  public addMessageValidator = (req: Request, res: Response, next: NextFunction) => {
    const schema = Joi.object({
      subject: Joi.string().required(),
      content: Joi.string().required(),
      recipient: Joi.string().required(),
    });

    const { error } = schema.validate(req.body);

    if (error) {
      throw new HttpError(error.details[0].message);
    }

    next();
  };
}

const messagesValidator = new MessagesValidator();

export default messagesValidator;

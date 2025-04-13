import { Request, Response, NextFunction } from 'express';
import type { HttpError } from '../../utils/error/http-error';
import { ApiResponse } from '../../utils/response/api-response';

export const errorHandler = (err: HttpError, req: Request, res: Response, next: NextFunction) => {
  console.error(`[Error] ${err.message}`);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json(new ApiResponse(err.message || 'Internal Server Error'));
};

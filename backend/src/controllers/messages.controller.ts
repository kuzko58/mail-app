import type { NextFunction, Request, Response } from 'express';
import messagesService from '../services/messages.service';
import { ApiResponse } from '../utils/response/api-response';

class MessagesController {
  private messagesService = messagesService;
  constructor() {}

  public getOneMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { messageId } = req.params;

      const message = await this.messagesService.getOneMessage({ id: messageId });

      return res.status(200).json(new ApiResponse('success', { message }));
    } catch (err) {
      next(err);
    }
  };

  public createMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { body } = req;
      const user = res.locals.user;

      const message = await this.messagesService.createMessage({ ...body, sender: user.id });

      return res.status(200).json(new ApiResponse('success', { message }));
    } catch (err) {
      next(err);
    }
  };

  public getUserReceivedMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;
      const page = req.query.page ? parseInt(req.query.page as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

      const data = await this.messagesService.getAllUserReceivedMessages({
        userId: user.id,
        page,
        limit,
      });

      return res.status(200).json(new ApiResponse('success', data));
    } catch (err) {
      next(err);
    }
  };

  public getUserSentMessages = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;
      const page = req.query.page ? parseInt(req.query.page as string) : undefined;
      const limit = req.query.limit ? parseInt(req.query.limit as string) : undefined;

      const data = await this.messagesService.getAllUserSentMessages({
        userId: user.id,
        page,
        limit,
      });

      return res.status(200).json(new ApiResponse('success', data));
    } catch (err) {
      next(err);
    }
  };

  public getUserMessagesStats = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = res.locals.user;

      const stats = await this.messagesService.getAllUserMessagesStats({
        userId: user.id,
      });

      return res.status(200).json(new ApiResponse('success', stats));
    } catch (err) {
      next(err);
    }
  };

  public updateMessage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { messageId } = req.params;

      const message = await this.messagesService.updateMessage({ id: messageId, ...req.body });

      return res.status(200).json(new ApiResponse('success', { message }));
    } catch (err) {
      next(err);
    }
  };

  public viewOneReceivedMessageAndMarkAsRead = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { messageId } = req.params;

      const message = await this.messagesService.updateMessage({ id: messageId, isRead: true });

      return res.status(200).json(new ApiResponse('success', { message }));
    } catch (err) {
      next(err);
    }
  };
}

const messagesController = new MessagesController();

export default messagesController;

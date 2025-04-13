import { Router } from 'express';
import messagesController from '../../controllers/messages.controller';
import usersAuth from '../../middlewares/auth/users.auth';
import messagesValidator from '../../middlewares/validators/messages.validator';

class MessagesRoutes {
  public router = Router();
  public messagesController = messagesController;
  public usersAuth = usersAuth;
  public messagesValidator = messagesValidator;

  constructor() {}

  registerRoutes = () => {
    this.router.post(
      '/create',
      this.usersAuth.authenticate,
      this.messagesValidator.addMessageValidator,
      this.messagesController.createMessage,
    );

    this.router.get(
      '/:messageId/view',
      this.usersAuth.authenticate,
      this.messagesController.getOneMessage,
    );

    this.router.get(
      '/received',
      this.usersAuth.authenticate,
      this.messagesController.getUserReceivedMessages,
    );

    this.router.get(
      '/sent',
      this.usersAuth.authenticate,
      this.messagesController.getUserSentMessages,
    );

    this.router.get(
      '/stats',
      this.usersAuth.authenticate,
      this.messagesController.getUserMessagesStats,
    );

    this.router.get(
      '/received-message/:messageId/view',
      this.usersAuth.authenticate,
      this.messagesController.viewOneReceivedMessageAndMarkAsRead,
    );
  };
}

const messagesRoutes = new MessagesRoutes();

messagesRoutes.registerRoutes();

export default messagesRoutes;

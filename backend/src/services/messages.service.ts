import {
  MessageQuery,
  NewMessageDTO,
  UpdateMessageDTO,
  UserMessageQuery,
} from '../dto/message.dto';
import MessagesModel from '../models/messages.model';

class MessagesService {
  private MessagesModel = MessagesModel;

  constructor() {}

  public getOneMessage = async (data: UpdateMessageDTO) => {
    const { id } = data;

    const message = await this.MessagesModel.findById(id).lean();

    return message;
  };

  public getAllUserReceivedMessages = async (data: UserMessageQuery) => {
    const { userId, page = 1, limit = 10 } = data;
    const skip = (page - 1) * limit;

    const filter = {
      recipient: userId,
      isDeleted: false,
    };

    const [messages, totalCount, unreadCount] = await Promise.all([
      this.MessagesModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate({
          path: 'sender',
          select: '_id firstName lastName email',
        })
        .lean(),

      this.MessagesModel.countDocuments(filter),

      this.MessagesModel.countDocuments({ ...filter, isRead: false }),
    ]);

    return {
      messages,
      stats: {
        total: totalCount,
        unread: unreadCount,
      },
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  };

  public getAllUserSentMessages = async (data: UserMessageQuery) => {
    const { userId, page = 1, limit = 10 } = data;
    const skip = (page - 1) * limit;

    const filter = {
      sender: userId,
      isDeleted: false,
    };

    const [messages, totalCount] = await Promise.all([
      this.MessagesModel.find(filter)
        .skip(skip)
        .limit(limit)
        .sort({ createdAt: -1 })
        .populate({
          path: 'recipient',
          select: '_id firstName lastName email',
        })
        .lean(),

      this.MessagesModel.countDocuments(filter),
    ]);

    return {
      messages,
      stats: {
        total: totalCount,
      },
      pagination: {
        page,
        limit,
        totalPages: Math.ceil(totalCount / limit),
      },
    };
  };

  public getAllUserMessagesStats = async (data: UserMessageQuery) => {
    const { userId } = data;

    const filter = {
      recipient: userId,
      isDeleted: false,
    };

    const [totalCount, unreadCount] = await Promise.all([
      this.MessagesModel.countDocuments(filter),

      this.MessagesModel.countDocuments({ ...filter, isRead: false }),
    ]);

    return {
      received: {
        total: totalCount,
        unread: unreadCount,
      },
    };
  };

  public createMessage = async (data: NewMessageDTO) => {
    const message = new this.MessagesModel(data);

    const newMessage = await message.save();

    return newMessage.toJSON();
  };

  public updateMessage = async (data: UpdateMessageDTO) => {
    const { id, ...update } = data;

    const message = await this.MessagesModel.findByIdAndUpdate(id, update, { new: true })
      .populate({
        path: 'recipient',
        select: '_id firstName lastName email',
      })
      .populate({
        path: 'sender',
        select: '_id firstName lastName email',
      })
      .lean();

    return message;
  };
}

const messagesService = new MessagesService();

export default messagesService;

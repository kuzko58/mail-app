export interface ISender {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
}

export interface IMessage {
  _id: string;
  subject: string;
  content: string;
  isRead: boolean;
  isDeleted: boolean;
  recipient: string;
  sender: ISender;
  createdAt: string;
  updatedAt: string;
}

export interface IMessageStats {
  total: number;
  unread: number;
}

export interface IPagination {
  page: number;
  limit: number;
  totalPages: number;
}

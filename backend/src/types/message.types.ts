import { Document, Types } from 'mongoose';
import { IUser } from './user.types';

export interface IMessage {
  _id: Types.ObjectId;
  subject: string;
  content: string;
  isRead: boolean;
  isDeleted: boolean;
  recipient: Types.ObjectId | IUser;
  sender: Types.ObjectId | IUser;
  createdAt?: Date;
  updatedAt?: Date;
}

export type MessageDocument = IMessage & Document;

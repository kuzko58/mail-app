import { Document, Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  secret: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export type UserDocument = IUser & Document;

export interface ICookieUser {
  id: string;
  email: string;
  exp?: number;
}

export interface NewMessageDTO {
  subject: string;
  content: string;
  recipient: string;
  sender: string;
}

export interface MessageQuery {
  id: string;
}

export interface UserMessageQuery {
  userId: string;
  page?: number;
  limit?: number;
}

export interface UpdateMessageDTO {
  id: string;
  isRead?: boolean;
  isDeleted?: boolean;
}

import {
  ChatRoomStatusEnum,
  MessageTypeEnum,
} from "services/notifications/chatEnums";

export interface IChatUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  avatarURL: string | null;
}

export interface IMessage {
  id: number;
  chatRoomId: number;
  created_at: string;
  senderId: number;
  text: string;
  messageType: MessageTypeEnum;
}

export interface IRoom {
  id: number;
  status: ChatRoomStatusEnum;
  freelancer: IChatUser;
  client: IChatUser;
  jobPost: {
    id: number;
    title: string;
  };
  lastMessage: {
    created_at: Date;
    id: number;
    isSystemMessage: boolean;
    text: string;
  };
}

export interface ISendMessage {
  chatRoomId: number;
  text: string;
}

export interface Notifications {
  id?: number;
  fromUserId: number;
  toUserId: number;
  type: string;
  read?: boolean;
  fromUser?: {
    id: number;
    firstName?: string;
  };
}

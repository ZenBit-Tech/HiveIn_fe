import {
  ChatRoomStatusEnum,
  MessageTypeEnum,
  NotificationTypeEnum,
} from "services/notifications/chatEnums";
import { OfferStatus } from "../../utils/enums";

export interface IChatUser {
  id: number;
  firstName: string | null;
  lastName: string | null;
  avatarURL: string | null;
}

export interface IFreelancerChatUser extends IChatUser {
  freelancerId: number;
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
  freelancer: IFreelancerChatUser;
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
  offerStatus?: OfferStatus;
}

export interface ISendMessage {
  chatRoomId: number;
  text: string;
}
interface INotificationContent {
  id: number;
  message: string;
}
export interface INotification {
  id: number;
  isRead: boolean;
  type: NotificationTypeEnum;
  text: string;
  createdAt: Date;
  roomId: number;
  message: INotificationContent | null;
  proposal: INotificationContent | null;
  offer: INotificationContent | null;
}

export interface INotificationResponse {
  notifications: INotification[];
  count: number;
}

export interface INotificationsCount {
  message: number;
  other: number;
}

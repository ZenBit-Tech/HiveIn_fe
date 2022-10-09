export enum EventEnum {
  ROOMS = "rooms",
  ROOM = "room",
  ERROR = "error",
  GET_ROOMS = "getRooms",
  JOIN_ROOM = "joinRoom",
  MESSAGES = "messages",
  GET_MESSAGES = "getMessages",
  LEAVE_ROOM = "leaveRoom",
  ADD_MESSAGE = "addMessage",
  MESSAGE_ADDED = "messageAdded",
  GET_COUNT_NOTIFICATIONS = "getCount",
  GET_NOTIFICATIONS = "getNotifications",
  MARK_AS_READ_NOTIFICATION = "markAsRead",
}

export enum MessageTypeEnum {
  FROM_USER = "fromUser",
  FROM_SYSTEM = "fromSystem",
}

export enum ChatRoomStatusEnum {
  FOR_ALL = "forAll",
  FREELANCER_ONLY = "freelancerOnly",
  CLIENT_ONLY = "clientOnly",
}

export enum NotificationTypeEnum {
  MESSAGE = "message",
  OFFER = "offer",
  PROPOSAL = "proposal",
}

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
  NOTIFICATION = "send-first-notification",
  NOTIFICATION_SEND = "'first-message'",
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
  NEW_MESSAGE = "newMessage",
  OFFER = "offer",
  INVITE = "invite",
  OFFER_EXPIRE = "offerExpire",
  CHAT_EXPIRE = "chatExpire",
}

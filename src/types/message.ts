export interface IMessage {
  id: string;
  text: string;
  createdAt: Date;
  uid: string;
  displayName: string;
  photoURL: string | null;
  topicId: string;
  replyTo: MessageReply | null;
}

interface MessageReply {
  id: IMessage["id"];
  text: IMessage["text"];
  displayName: IMessage["displayName"];
}

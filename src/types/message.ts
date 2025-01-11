export interface IMessage {
  id: string;
  text: string;
  createdAt: Date;
  uid: string;
  displayName: string;
  photoURL: string | null;
}

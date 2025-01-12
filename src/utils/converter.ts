import { FirestoreDataConverter, DocumentData, Timestamp } from "firebase/firestore";
import { IMessage } from "../types/message";

export const messageConverter: FirestoreDataConverter<IMessage> = {
  toFirestore: (message: IMessage): DocumentData => {
    return {
      id: message.id,
      text: message.text,
      createdAt: message.createdAt,
      uid: message.uid,
      displayName: message.displayName,
      photoURL: message.photoURL,
      topicId: message.topicId,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)!;
    return {
      id: data.id,
      text: data.text,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
      uid: data.uid,
      displayName: data.displayName,
      photoURL: data.photoURL,
      topicId: data.topicId,
    };
  },
};

import React, { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Box, Button, Container, Grid2, TextField } from "@mui/material";
import { Navigate } from "react-router";
import { useCollectionData, useCollection } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import {
  collection,
  query,
  orderBy,
  addDoc,
  serverTimestamp,
  FirestoreDataConverter,
  DocumentData,
  Timestamp,
} from "firebase/firestore";

import ChatMessages from "../components/Chat/ChatMessages";
import ChatInput from "../components/Chat/ChatInput";

export interface IMessage {
  text: string;
  createdAt: Date;
  uid: string;
  displayName: string;
  photoURL: string | null;
}

const messageConverter: FirestoreDataConverter<IMessage> = {
  toFirestore: (message: IMessage): DocumentData => {
    return {
      text: message.text,
      createdAt: message.createdAt,
      uid: message.uid,
      displayName: message.displayName,
      photoURL: message.photoURL,
    };
  },
  fromFirestore: (snapshot, options) => {
    const data = snapshot.data(options)!;
    return {
      text: data.text,
      createdAt: data.createdAt instanceof Timestamp ? data.createdAt.toDate() : new Date(data.createdAt),
      uid: data.uid,
      displayName: data.displayName,
      photoURL: data.photoURL,
    };
  },
};

const ChatPage = () => {
  const { isAuth, loading, user } = useAuth();
  // const [value, setValue] = useState("");

  const messagesCollection = collection(db, "messages").withConverter(messageConverter);
  const messagesQuery = query(messagesCollection, orderBy("createdAt"));
  const [messages, messagesLoading, messagesError] = useCollectionData<IMessage>(messagesQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  const sendMessage = async (text: string) => {
    if (text.trim() !== "" && user) {
      await addDoc(messagesCollection, {
        text,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName || user.email!,
      });
    }
  };

  return isAuth ? (
    <Container maxWidth={"md"}>
      <Grid2 container gap={2} padding={1}>
        <ChatMessages messages={messages} loading={messagesLoading} />
        <ChatInput sendMessage={sendMessage} />
      </Grid2>
    </Container>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ChatPage;

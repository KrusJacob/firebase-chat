import { useAuth } from "../hooks/useAuth";
import { Container, Grid2 } from "@mui/material";
import { Navigate } from "react-router";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, messagesCollection } from "../firebase";
import { query, orderBy, serverTimestamp, doc, setDoc } from "firebase/firestore";

import ChatMessages from "../components/Chat/ChatMessages";
import ChatInput from "../components/Chat/ChatInput";
import { IMessage } from "../types/message";
import { messageConverter } from "../utils/converter";

const ChatPage = () => {
  const { isAuth, loading, user } = useAuth();

  const messagesCollectionWithConverter = messagesCollection.withConverter(messageConverter);
  const messagesQuery = query(messagesCollectionWithConverter, orderBy("createdAt"));
  const [messages, messagesLoading] = useCollectionData<IMessage>(messagesQuery);

  if (loading) {
    return <p>Loading...</p>;
  }

  const sendMessage = async (text: string) => {
    if (text.trim() !== "" && user) {
      const docRef = doc(messagesCollectionWithConverter);
      await setDoc(docRef, {
        id: docRef.id,
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

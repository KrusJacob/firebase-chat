import { useAuth } from "../hooks/useAuth";
import { Container, Grid2 } from "@mui/material";
import { Navigate } from "react-router";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db, messagesCollection } from "../firebase";
import { query, orderBy, serverTimestamp, doc, setDoc, where } from "firebase/firestore";
import ChatInput from "../components/Chat/ChatInput";
import { IMessage } from "../types/message";
import { messageConverter } from "../utils/converter";
import TopicList from "../components/Topic/TopicList";
import { useState } from "react";
import ChatMessages from "../components/Chat/ChatMessages";
import Loader from "../components/UI/Loader/Loader";

const ChatPage = () => {
  const { isAuth, loading, user } = useAuth();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  const messagesCollectionWithConverter = messagesCollection.withConverter(messageConverter);
  // const messagesQuery = query(messagesCollectionWithConverter, orderBy("createdAt"));
  const messagesQuery = selectedTopicId
    ? query(messagesCollectionWithConverter, where("topicId", "==", selectedTopicId), orderBy("createdAt"))
    : null;

  const [messages, messagesLoading, error] = useCollectionData(messagesQuery);

  if (loading) {
    return <Loader />;
  }

  const sendMessage = async (text: string) => {
    if (text.trim() !== "" && user && selectedTopicId) {
      console.log("send", selectedTopicId);
      const docRef = doc(messagesCollectionWithConverter);
      await setDoc(docRef, {
        id: docRef.id,
        text,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName || user.email!,
        topicId: selectedTopicId,
      });
    }
  };

  return isAuth ? (
    <Container maxWidth={"md"}>
      <Grid2 container gap={2} padding={1}>
        <TopicList onSelectTopic={setSelectedTopicId} />
        {selectedTopicId && (
          <>
            <ChatMessages messages={messages} loading={messagesLoading} />
            <ChatInput sendMessage={sendMessage} />
          </>
        )}
      </Grid2>
    </Container>
  ) : (
    <Navigate to={"/login"} />
  );
};

export default ChatPage;

import { useAuth } from "../hooks/useAuth";
import { Container, Grid2 } from "@mui/material";
import { Navigate } from "react-router";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { messagesCollection } from "../firebase";
import { query, orderBy, serverTimestamp, doc, setDoc, where } from "firebase/firestore";
import ChatInput from "../components/Chat/ChatInput";
import { messageConverter } from "../utils/converter";
import TopicList from "../components/Topic/TopicList";
import { useState } from "react";
import ChatMessages from "../components/Chat/ChatMessages";
import Loader from "../components/UI/Loader/Loader";
import { useMessageContextStore } from "../store/messageContextStore";

const ChatPage = () => {
  const { isAuth, loading, user } = useAuth();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const replyTo = useMessageContextStore((state) => state.replyTo);
  const setReplyTo = useMessageContextStore((state) => state.setReplyTo);

  const messagesCollectionWithConverter = messagesCollection.withConverter(messageConverter);
  const messagesQuery = selectedTopicId
    ? query(messagesCollectionWithConverter, where("topicId", "==", selectedTopicId), orderBy("createdAt"))
    : null;

  const [messages, messagesLoading, error] = useCollectionData(messagesQuery);

  if (loading) {
    return <Loader />;
  }

  const sendMessage = async (text: string) => {
    if (text.trim() !== "" && user && selectedTopicId) {
      setReplyTo(null);
      const docRef = doc(messagesCollectionWithConverter);
      await setDoc(docRef, {
        id: docRef.id,
        text,
        photoURL: user.photoURL,
        createdAt: serverTimestamp(),
        uid: user.uid,
        displayName: user.displayName || user.email!,
        topicId: selectedTopicId,
        replyTo: replyTo ? { id: replyTo.id, displayName: replyTo.displayName, text: replyTo.text } : null,
      });
    }
  };

  return isAuth ? (
    <Container maxWidth={"md"} sx={{ paddingBottom: 4 }}>
      <Grid2 container gap={1}>
        <TopicList onSelectTopic={setSelectedTopicId} />
        {selectedTopicId && (
          <>
            <ChatMessages messages={messages} loading={messagesLoading} />
            <ChatInput sendMessage={sendMessage} replyTo={replyTo} clearReply={() => setReplyTo(null)} />
          </>
        )}
      </Grid2>
    </Container>
  ) : (
    <Navigate to={"/login"} />
  );
};

// const CHAT_BG_COLOR = {
//   General: "#b8dce2",
//   Sport: "#b8dce2",
//   Kino: "#b8dce2",
//   Games: "#b8dce2",
//   News: "#b8dce2",
//   Health: "#b8dce2",
// };

export default ChatPage;

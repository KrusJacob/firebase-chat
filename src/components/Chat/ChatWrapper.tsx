import { Grid2 } from "@mui/material";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { useMessageContextStore } from "../../store/messageContextStore";
import { messagesCollection } from "../../firebase";
import { messageConverter } from "../../utils/converter";
import { query, where, orderBy, doc, setDoc, serverTimestamp } from "@firebase/firestore";

const ChatWrapper = ({
  selectedTopicId,
  user,
}: {
  selectedTopicId: string | null;
  user: any | null | undefined;
}) => {
  const replyTo = useMessageContextStore((state) => state.replyTo);
  const setReplyTo = useMessageContextStore((state) => state.setReplyTo);

  const messagesCollectionWithConverter = messagesCollection.withConverter(messageConverter);
  const messagesQuery = selectedTopicId
    ? query(messagesCollectionWithConverter, where("topicId", "==", selectedTopicId), orderBy("createdAt"))
    : null;
  const [messages, messagesLoading, error] = useCollectionData(messagesQuery);

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

  return (
    <Grid2 container width={"100%"} gap={1}>
      <ChatMessages messages={messages} loading={messagesLoading} />
      <ChatInput sendMessage={sendMessage} replyTo={replyTo} clearReply={() => setReplyTo(null)} />
    </Grid2>
  );
};

export default ChatWrapper;

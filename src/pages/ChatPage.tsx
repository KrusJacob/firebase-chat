import { useAuth } from "../hooks/useAuth";
import { Container, Grid2 } from "@mui/material";
import { Navigate } from "react-router";
import TopicList from "../components/Topic/TopicList";
import { useState } from "react";
import Loader from "../components/UI/Loader/Loader";
import ChatWrapper from "../components/Chat/ChatWrapper";

const ChatPage = () => {
  const { isAuth, loading, user } = useAuth();
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);

  if (loading) {
    return <Loader />;
  }

  return isAuth ? (
    <Container maxWidth={"md"} sx={{ paddingBottom: 4 }}>
      <Grid2 container gap={1}>
        <TopicList onSelectTopic={setSelectedTopicId} />
        {selectedTopicId && <ChatWrapper user={user} selectedTopicId={selectedTopicId} />}
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

import { Grid2, Typography } from "@mui/material";
import React from "react";
import Message from "../Message/Message";
import { IMessage } from "../../pages/ChatPage";
import { useAuth } from "../../hooks/useAuth";
import { format, isSameDay } from "date-fns";

const ChatMessages = ({ messages, loading }: { messages: IMessage[] | undefined; loading: boolean }) => {
  const { user } = useAuth();

  const renderMessages = () => {
    let lastDate: Date | null = null;
    return messages?.map((message, i) => {
      const messageDate = new Date(message.createdAt);
      const showDate = !lastDate || !isSameDay(lastDate, messageDate);
      lastDate = messageDate;
      return (
        <React.Fragment key={i}>
          {showDate && (
            <Typography
              position={"sticky"}
              top={0}
              variant="subtitle2"
              color="textSecondary"
              sx={{ textAlign: "center", p: 0.5, backgroundColor: "inherit", zIndex: 1 }}
            >
              {format(messageDate, "dd MMMM yyyy")}
            </Typography>
          )}
          <Message isUser={user?.uid === message.uid} message={message} />
        </React.Fragment>
      );
    });
  };

  return (
    <Grid2
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        height: "70vh",
        width: "100%",
        mt: 4,
        p: 1,
        pt: 0,
        borderRadius: "6px",
        overflowY: "auto",
        backgroundColor: "#b8dce2",
        gap: 1,
        scrollbarWidth: "thin",
      }}
    >
      {loading && <p>Loading...</p>}

      {renderMessages()}
      {/* {messages?.map((message, i) => (
        <Message isUser={user?.uid === message.uid} key={i} message={message} />
      ))} */}
    </Grid2>
  );
};

export default ChatMessages;

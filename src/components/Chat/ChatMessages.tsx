import { Grid2, Typography } from "@mui/material";
import React, { useEffect, useRef } from "react";
import Message from "../Message/Message";
import { useAuth } from "../../hooks/useAuth";
import { format, isSameDay } from "date-fns";
import { IMessage } from "../../types/message";
import { deleteDoc, doc } from "firebase/firestore";
import { messagesCollection } from "../../firebase";
import Loader from "../UI/Loader/Loader";

const ChatMessages = ({ messages, loading }: { messages: IMessage[] | undefined; loading: boolean }) => {
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView();
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const renderMessages = () => {
    let lastDate: Date | null = null;
    return messages?.map((message, i) => {
      // console.log(message.createdAt, i);

      const messageDate = new Date(message.createdAt);

      let showDate = !lastDate || !isSameDay(lastDate, messageDate);
      if (!messageDate.getTime()) {
        showDate = false;
      }
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
          <Message onDelete={handleDeleteMessage} isUser={user?.uid === message.uid} message={message} />
        </React.Fragment>
      );
    });
  };

  const handleDeleteMessage = async (id: string) => {
    if (id) {
      await deleteDoc(doc(messagesCollection, id));
    }
  };

  return (
    <Grid2
      sx={{
        display: "flex",
        flexDirection: "column",
        border: "1px solid black",
        height: "70vh",
        width: "100%",
        p: 1,
        pt: 0,
        borderRadius: "6px",
        overflowY: "auto",
        backgroundColor: "#b8dce2",
        gap: 1,
        scrollbarWidth: "thin",
      }}
    >
      {loading && <Loader />}

      {messages && messages.length > 0 && renderMessages()}

      <div ref={messagesEndRef} />
    </Grid2>
  );
};

export default ChatMessages;

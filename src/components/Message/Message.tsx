import { Avatar, Box, Grid2, Typography } from "@mui/material";
import React, { FC } from "react";
import { format } from "date-fns";
import { IMessage } from "../../pages/ChatPage";

const Message = ({ message, isUser }: { message: IMessage; isUser: boolean }) => {
  return (
    <Grid2 display={"flex"} gap={1} sx={{ justifyContent: isUser ? "flex-end" : "flex-start" }}>
      {!isUser && <Avatar alt={message.displayName} src={message.photoURL || ""} />}
      <Box
        sx={{
          backgroundColor: "white",
          px: 1.5,
          py: 0.7,
          maxWidth: "70%", // Ограничение ширины
          // flexGrow: 1,
          wordWrap: "break-word", // Перенос слов
          borderRadius: isUser ? "8px 0 8px 8px" : "0 8px 8px 8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography color="#4F93D3" fontWeight={"600"}>
          {message.displayName}
        </Typography>
        <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
          {message.text}
        </Typography>
        <span style={{ opacity: 0.5, marginLeft: "auto", fontSize: 14 }}>
          {format(message.createdAt, "HH:mm")}
        </span>
      </Box>
    </Grid2>
  );
};

export default Message;

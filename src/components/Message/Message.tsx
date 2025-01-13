import { Avatar, Box, Grid2, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";
import { IMessage } from "../../types/message";
import MessageContextMenu from "./MessageContextMenu";
import useMessageContextMenu from "./useMessageContextMenu";
import { Dispatch, SetStateAction } from "react";

interface Props {
  message: IMessage;
  isUser: boolean;
  onDelete: (id: string) => void;
}

const Message = ({ message, isUser, onDelete }: Props) => {
  const { handleContextMenu } = useMessageContextMenu(message);

  return (
    <Grid2 display={"flex"} gap={1} sx={{ justifyContent: isUser ? "flex-end" : "flex-start" }}>
      {!isUser && <Avatar alt={message.displayName} src={message.photoURL || ""} />}

      <Box
        onContextMenu={handleContextMenu}
        sx={{
          backgroundColor: "white",
          px: 1.5,
          py: 0.7,
          maxWidth: "70%",
          wordWrap: "break-word",
          borderRadius: isUser ? "8px 0 8px 8px" : "0 8px 8px 8px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography color="#4F93D3" fontWeight={"600"}>
          {message.displayName}
        </Typography>
        {message.replyTo && (
          <Box bgcolor={"#ECF6E8"} p={1} borderRadius={"8px"}>
            <Typography color="#4F93D3" fontWeight={"600"}>
              {message.replyTo.displayName}
            </Typography>
            <Typography variant="body1">{message.replyTo.text}</Typography>
          </Box>
        )}
        <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
          {message.text}
        </Typography>
        <span style={{ opacity: 0.5, marginLeft: "auto", fontSize: 14 }}>
          {format(message.createdAt, "HH:mm")}
        </span>
      </Box>
      <MessageContextMenu message={message} isUser={isUser} onDelete={onDelete} />
    </Grid2>
  );
};

export default Message;

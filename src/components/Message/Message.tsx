import { Avatar, Box, Grid2, IconButton, Typography } from "@mui/material";
import { format } from "date-fns";
import { IMessage } from "../../types/message";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/ReactContexify.css";

interface Props {
  message: IMessage;
  isUser: boolean;
  onDelete: (id: string) => void;
}

const Message = ({ message, isUser, onDelete }: Props) => {
  const { show } = useContextMenu({ id: `contextmenu-${message.id}` });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    show({ id: `contextmenu-${message.id}`, event });
  };

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(message.text)
      .then(() => {
        console.log("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

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
        <Typography variant="body1" style={{ whiteSpace: "pre-wrap" }}>
          {message.text}
        </Typography>
        <span style={{ opacity: 0.5, marginLeft: "auto", fontSize: 14 }}>
          {format(message.createdAt, "HH:mm")}
        </span>
      </Box>
      <Menu id={`contextmenu-${message.id}`}>
        <Item onClick={handleCopyText}>Copy text</Item>
        <Item disabled={!isUser} onClick={() => onDelete(message.id)}>
          Delete message
        </Item>
      </Menu>
    </Grid2>
  );
};

export default Message;

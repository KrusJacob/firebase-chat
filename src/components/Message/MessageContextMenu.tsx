import { Menu, Item, useContextMenu } from "react-contexify";
import { IMessage } from "../../types/message";
import "react-contexify/ReactContexify.css";
import { toast } from "react-toastify";
import { Typography } from "@mui/material";
import { useMessageContextStore } from "../../store/messageContextStore";
import ReplyIcon from "@mui/icons-material/Reply";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

interface Props {
  message: IMessage;
  isUser: boolean;
  onDelete: (id: string) => void;
}

const MessageContextMenu = ({ message, isUser, onDelete }: Props) => {
  const setReplyTo = useMessageContextStore((state) => state.setReplyTo);

  const handleCopyText = () => {
    navigator.clipboard
      .writeText(message.text)
      .then(() => {
        toast.success("Text copied to clipboard");
      })
      .catch((err) => {
        console.error("Failed to copy text: ", err);
        toast.error("Failed to copy text");
      });
  };

  return (
    <Menu className="contextMenu" id={`contextmenu-${message.id}`}>
      <Item onClick={() => setReplyTo(message)}>
        <ReplyIcon sx={{ marginRight: 1.5 }} />
        Reply
      </Item>
      <Item onClick={handleCopyText}>
        <ContentCopyIcon sx={{ marginRight: 1.5 }} />
        Copy text
      </Item>
      <Item disabled={!isUser} onClick={() => onDelete(message.id)}>
        <DeleteForeverIcon sx={{ marginRight: 1.5 }} color="warning" />
        <Typography color="warning">Delete message</Typography>
      </Item>
    </Menu>
  );
};

export default MessageContextMenu;

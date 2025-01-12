import { Menu, Item, useContextMenu } from "react-contexify";
import { IMessage } from "../../types/message";
import "react-contexify/ReactContexify.css";

interface Props {
  message: IMessage;
  isUser: boolean;
  onDelete: (id: string) => void;
}

const MessageContextMenu = ({ message, isUser, onDelete }: Props) => {
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
    <Menu className="contextMenu" id={`contextmenu-${message.id}`}>
      <Item onClick={handleCopyText}>Copy text</Item>
      <Item disabled={!isUser} onClick={() => onDelete(message.id)}>
        <span className="red-text">Delete message</span>
      </Item>
    </Menu>
  );
};

export default MessageContextMenu;

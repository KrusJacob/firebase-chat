import React from "react";
import { useContextMenu } from "react-contexify";
import { IMessage } from "../../types/message";

const useMessageContextMenu = (message: IMessage) => {
  const { show } = useContextMenu({ id: `contextmenu-${message.id}` });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
    show({ id: `contextmenu-${message.id}`, event });
  };

  return { handleContextMenu };
};

export default useMessageContextMenu;

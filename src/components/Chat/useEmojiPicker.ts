import React from "react";
import { useState } from "react";

const useEmojiPicker = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openEmojiPicker = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const closeEmojiPicker = () => {
    setAnchorEl(null);
  };

  const isOpen = Boolean(anchorEl);
  const id = isOpen ? "emoji-popover" : undefined;

  return { openEmojiPicker, closeEmojiPicker, isOpen, id, anchorEl };
};

export default useEmojiPicker;

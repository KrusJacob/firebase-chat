import { Box, TextField, Button, IconButton } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
// import "emoji-mart/css/emoji-mart.css";

const ChatInput = ({ sendMessage }: { sendMessage: (text: string) => Promise<void> }) => {
  const [value, setValue] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const emojiPickerRef = useRef<HTMLDivElement>(null);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" && !event.shiftKey && value.trim() !== "") {
      event.preventDefault();
      handlerSendMessage();
    }
  };

  const handlerSendMessage = () => {
    sendMessage(value);
    setValue("");
  };

  const addEmoji = (emoji: any) => {
    setValue(value + emoji.native);
    setShowEmojiPicker(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target as Node)) {
      setShowEmojiPicker(false);
    }
  };

  useEffect(() => {
    if (showEmojiPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showEmojiPicker]);

  return (
    <Box alignItems={"center"} display={"flex"} width={"100%"} position={"relative"} gap={1} bgcolor={"white"}>
      <TextField
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyPress}
        multiline
        size="small"
        maxRows={4}
        sx={{ flexGrow: 1 }}
      />

      <IconButton onClick={() => setShowEmojiPicker(!showEmojiPicker)}> 😊 </IconButton>

      {showEmojiPicker && (
        <Box ref={emojiPickerRef} style={{ position: "absolute", bottom: "54px", right: "0", zIndex: 5 }}>
          <Picker data={data} onEmojiSelect={addEmoji} />
        </Box>
      )}
      <Button disabled={!value} onClick={handlerSendMessage} variant="contained">
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;

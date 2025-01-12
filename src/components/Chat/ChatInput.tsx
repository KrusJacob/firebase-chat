import { Box, TextField, Button, IconButton, Popover } from "@mui/material";
import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useEmojiPicker from "./useEmojiPicker";

const ChatInput = ({ sendMessage }: { sendMessage: (text: string) => Promise<void> }) => {
  const [value, setValue] = useState("");
  const { openEmojiPicker, closeEmojiPicker, id, isOpen, anchorEl } = useEmojiPicker();

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
  };

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

      <IconButton onClick={openEmojiPicker}> 😊 </IconButton>

      <Popover
        id={id}
        open={isOpen}
        anchorEl={anchorEl}
        onClose={closeEmojiPicker}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        transformOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Picker data={data} onEmojiSelect={addEmoji} />
      </Popover>
      <Button disabled={!value} onClick={handlerSendMessage} variant="contained">
        Send
      </Button>
    </Box>
  );
};

export default ChatInput;

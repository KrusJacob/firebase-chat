import { Box, TextField, Button, IconButton, Popover, Typography, Grid2 } from "@mui/material";
import React, { useState } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import useEmojiPicker from "./useEmojiPicker";
import { IMessage } from "../../types/message";
import CloseIcon from "@mui/icons-material/Close";

interface Props {
  sendMessage: (text: string) => Promise<void>;
  replyTo: IMessage | null;
  clearReply: () => void;
}

const ChatInput = ({ sendMessage, replyTo, clearReply }: Props) => {
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        position: "relative",
        // gap: 0.5,
        // bgcolor: "white",
      }}
    >
      {replyTo && (
        <Box
          sx={{
            width: "100%",
            bgcolor: "#ECF6E8",
            py: 0.5,
            px: 2,
            borderRadius: 1,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Grid2>
            <Typography variant="body2" color="textSecondary">
              <span style={{ fontWeight: 600 }}>Reply to:</span> {replyTo.displayName}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {replyTo.text}
            </Typography>
          </Grid2>
          <IconButton size="small" onClick={clearReply}>
            <CloseIcon />
          </IconButton>
        </Box>
      )}
      <Grid2 sx={{ width: "100%", display: "flex", alignItems: "center" }}>
        <TextField
          placeholder="Message"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={handleKeyPress}
          multiline
          size="small"
          maxRows={4}
          sx={{ flexGrow: 1, bgcolor: "white" }}
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
      </Grid2>
    </Box>
  );
};

export default ChatInput;

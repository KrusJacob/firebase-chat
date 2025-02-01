import { create } from "zustand";
import { IMessage } from "../types/message";

interface MessageContextState {
  replyTo: IMessage | null;
  setReplyTo: (message: IMessage | null) => void;
}
export const useMessageContextStore = create<MessageContextState>((set) => ({
  replyTo: null,
  setReplyTo: (message) => set({ replyTo: message }),
}));

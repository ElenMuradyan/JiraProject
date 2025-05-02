import { message } from "@/types/messages";
import { userData } from "./userState";

export interface SendMessageParams {
  input: string;
  chatId: string;
  communityId: string;
  setLoading: (val: boolean) => void;
  setInput: (val: string) => void;
  userData: userData
}

export interface ListenForMessagesParams {
  communityId: string;
  chatId: string;
  onNewMessage: (msg: message) => void;
}
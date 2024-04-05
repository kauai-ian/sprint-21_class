import { useContext } from "react";
import { MessagesContext } from "../context/MessagesContext";

const useMessages = () => {
  const { messages, isLoading, addMessage, updateMessage, deleteMessage } =
    useContext(MessagesContext);
  return {
    messages,
    isLoading,
    addMessage,
    updateMessage,
    deleteMessage,
  };
};

export default useMessages;

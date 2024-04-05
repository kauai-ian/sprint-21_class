import { useContext, useEffect } from "react";
import { MessagesContext } from "../context/messagesContext";
import * as api from "../api/messages";

const useMessages = () => {
  const { messages, addMessage, deleteMessage, updateMessage, setMessages } =
    useContext(MessagesContext);

  const fetchMessages = async () => {
    const { data } = await api.list();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  return {
    messages,
    addMessage,
    deleteMessage,
    updateMessage,
  };
};

export default useMessages;

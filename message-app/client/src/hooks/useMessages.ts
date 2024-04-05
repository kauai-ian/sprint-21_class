import { useContext } from "react";
import { MessagesContext } from "../context/MessagesContext";
import useCurrentUser from "./useCurrentUser";
import * as api from "../api/messages";

const useMessages = () => {
  const { currentUser } = useCurrentUser();
  const {
    messages,
    isLoading,
    addMessage,
    setIsLoading,
    updateMessage,
    updateMessageLikes,
    deleteMessage,
  } = useContext(MessagesContext);

  const createMessage = async (body: string, cb?: () => void) => {
    try {
      if (!currentUser) {
        return;
      }

      setIsLoading(true);
      const { data } = await api.createMessage(body, currentUser._id);
      if (!data) {
        throw new Error("Failed to create message");
      }
      addMessage(data);
      setIsLoading(false);
      if (cb) {
        cb();
      }
    } catch (error) {
      console.error("Failed to create message", error);
    }
    setIsLoading(false);

  };

  return {
    messages,
    isLoading,
    addMessage,
    updateMessage,
    deleteMessage,
    updateMessageLikes,
    createMessage,
  };
};

export default useMessages;

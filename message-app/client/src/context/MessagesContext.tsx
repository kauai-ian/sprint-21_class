import { useState, FC, createContext, ReactNode, useEffect } from "react";
import { IMessage, IUser } from "../types";
import * as api from "../api/messages";

export type MessagesContextType = {
  messages: IMessage[] | undefined;
  isLoading: boolean;
  addMessage: (message: IMessage) => void;
  updateMessage: (message: IMessage) => void;
  deleteMessage: (_id: string) => void;
  updateMessageLikes: (_id: string, likes: IUser[]) => void;
};

const initState: MessagesContextType = {
  messages: undefined,
  isLoading: true,
  addMessage: () => {},
  updateMessage: () => {},
  deleteMessage: () => {},
  updateMessageLikes: () => {},
};

export const MessagesContext = createContext<MessagesContextType>(initState);

const MessagesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addMessage = (message: IMessage) => {
    setMessages((prev) => [message, ...prev]);
  };

  const updateMessage = (message: IMessage) => {
    setMessages((prev) =>
      prev.map((m) => (m._id === message._id ? message : m))
    );
  };

  const updateMessageLikes = (_id: string, likes: IUser[]) => {
    setMessages((prev) =>
      prev.map((m) => {
        if (m._id === _id) {
          return { ...m, likes };
        }
        return m;
      })
    );
  };

  const deleteMessage = (_id: string) => {
    setMessages((prev) => prev.filter((m) => m._id !== _id));
  };

  const fetchMessages = async () => {
    try {
      const { data } = await api.listMessages();

      if (!data) {
        throw new Error("Failed to get current user");
      }
      setMessages(data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        isLoading,
        addMessage,
        updateMessage,
        deleteMessage,
        updateMessageLikes,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;

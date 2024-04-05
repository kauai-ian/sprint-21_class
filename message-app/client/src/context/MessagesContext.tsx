import { useState, FC, createContext, ReactNode, useEffect } from "react";
import { IMessage } from "../types";
import * as api from "../api/messages";

export type MessagesContextType = {
  messages: IMessage[] | undefined;
  isLoading: boolean;
  addMessage: (message: IMessage) => void;
  updateMessage: (message: IMessage) => void;
  deleteMessage: (_id: string) => void;
};

const initState: MessagesContextType = {
  messages: undefined,
  isLoading: true,
  addMessage: () => {},
  updateMessage: () => {},
  deleteMessage: () => {},
};

export const MessagesContext = createContext<MessagesContextType>(initState);

const MessagesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const addMessage = (message: IMessage) => {
    setMessages((prev) => [...prev, message]);
  };

  const updateMessage = (message: IMessage) => {
    setMessages((prev) =>
      prev.map((m) => (m._id === message._id ? message : m))
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
      value={{ messages, isLoading, addMessage, updateMessage, deleteMessage }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;

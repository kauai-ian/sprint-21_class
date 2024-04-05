import { createContext, useState, FC, ReactNode } from "react";
import { IMessage } from "../types";

type MessageContextType = {
  messages: IMessage[];
  addMessage: (message: IMessage) => void;
  deleteMessage: (id: string) => void;
  updateMessage: (message: IMessage) => void;
  setMessages: (messages: IMessage[]) => void;
};

const messagesContext: MessageContextType = {
  messages: [],
  addMessage: () => {},
  deleteMessage: () => {},
  updateMessage: () => {},
  setMessages: () => {},
};

export const MessagesContext =
  createContext<MessageContextType>(messagesContext);

const MessagesProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  const addMessage = (message: IMessage) => {
    setMessages([message, ...messages]);
  };

  const deleteMessage = (id: string) => {
    setMessages(messages.filter((m) => m._id !== id));
  };

  const updateMessage = (message: IMessage) => {
    setMessages(
      messages.map((m) => (m._id === message._id ? { ...m, ...message } : m))
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        addMessage,
        deleteMessage,
        updateMessage,
        setMessages,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export default MessagesProvider;

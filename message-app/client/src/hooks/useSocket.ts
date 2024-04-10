import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import useMessages from "./useMessages";

const useSocket = () => {
  const { addMessage } = useMessages();
  const { lastMessage, readyState } = useWebSocket("ws://localhost:3000");

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  useEffect(() => {
    if (lastMessage !== null) {
      const { data, type } = JSON.parse(lastMessage.data);
      console.log("Message received: ", type);
      if (type === "NEW_MESSAGE") {
        addMessage(data);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lastMessage]);

  useEffect(() => {
    console.log("WS Connection status: ", connectionStatus);
  }, [connectionStatus]);
};

export default useSocket;

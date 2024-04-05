const WebSocket = require("ws");

const broadcast = (clients, message) => {
  if (!clients || !clients.size) {
    return;
  }
  clients.forEach((client) => {
    if (client?.readyState !== WebSocket.OPEN) {
      return;
    }
    client.send(JSON.stringify(message));
  });
};

module.exports = {
  broadcast,
};

// websocket.ts
let socketInstance: WebSocket | null = null;

export const getWebSocketInstance = (): WebSocket => {
  if (!socketInstance || socketInstance.readyState === WebSocket.CLOSED) {
    // If the instance is not created or closed, create a new one
    socketInstance = new WebSocket("ws://localhost:8080");
  }
  return socketInstance;
};

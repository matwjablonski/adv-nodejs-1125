import { WebSocketServer } from 'ws';
import { Server as HttpServer } from 'http';

interface WebSocketServerWithBroadcast extends WebSocketServer {
  broadcast: (data: unknown) => void;
}

export function createWebSocketHub(server: HttpServer): WebSocketServerWithBroadcast {
  const wss = new WebSocketServer({ server }) as WebSocketServerWithBroadcast;

  wss.broadcast = (data: unknown) => {
    const msg = JSON.stringify(data);
    for (const c of wss.clients) {
      if (c.readyState === 1) c.send(msg);
    }
  };

  return wss;
}

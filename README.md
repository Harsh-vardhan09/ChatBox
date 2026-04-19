socket.io
```js
  import {Server} from "socket.io"
  const server=app.listen(PORT,()=>console.log(`app running on http://localhost:${PORT}`))
  const io=new Server(server);
```
Here, Socket.IO is being attached to that same HTTP server. That’s important for a few reasons:

1. WebSockets start as HTTP requests
A WebSocket connection doesn’t magically appear—it begins as a normal HTTP request (called a handshake) and then upgrades to a persistent connection. Socket.IO needs access to the HTTP server to intercept and upgrade that request.

2. Single server, multiple responsibilities
By passing server into Socket.IO:

Express handles regular routes (/api, /login, etc.)
Socket.IO handles real-time connections (connect, message, etc.)

Both run on the same port and server.

3. Sharing the same port (clean architecture)
If you didn’t do this, you’d end up needing:

One server for HTTP (Express)
Another for WebSockets

That’s messy and unnecessary. This approach keeps everything unified.

4. Access to low-level events
Socket.IO sometimes needs direct access to the underlying server (for upgrades, headers, etc.), which Express alone doesn’t expose.

---

Socket.Broadcast is used to send to all other than the sender
socket.emit send the message to all sockets

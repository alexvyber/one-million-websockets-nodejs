import { WebSocketServer } from "ws"

const wss = new WebSocketServer({ port: 8080, perMessageDeflate: false })
let connections = 0

wss.on("connection", (ws) => {
  connections += 1

  ws.on("close", () => connections--)
  ws.on("error", console.error)
  ws.on("message", (data) => ws.send(data))
  ws.send("Hello!")
})

// setInterval(() => console.log(`${connections}, ${process.memoryUsage().rss / connections}`), 100)

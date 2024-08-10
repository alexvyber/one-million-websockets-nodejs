import { WebSocket } from "ws"
import { resolve4 } from "node:dns"

const message = "Hello World!"
const sockets = []
let server = "localhost"

resolve4("server", (_, addr) => (server = addr[0]))

setInterval(() => {
  const spawnLimit = Math.min(10000 - sockets.length, 10)

  for (let i = 0; i < spawnLimit; i++) {
    const socket = new WebSocket(`ws://${server}:8080/path`)
    socket.on("error", console.error)
    socket.on("open", () => sockets.push(socket))
    socket.on("close", () => sockets.splice(sockets.indexOf(socket), 1))
  }
}, 10)

setInterval(() => {
  if (sockets.length === 0) return
  const socket = sockets[Math.floor(Math.random() * sockets.length)]
  socket.send(message)
}, 10)


import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";


const ydoc = new Y.Doc();
const searchParams = new URLSearchParams(window.location.search);
const hostName = searchParams.has("host")
  ? searchParams.get("host")
  : "ws://localhost:3000/ws";
const provider = new WebsocketProvider(hostName, "vue-sample", ydoc);
provider.on("status", (event) => {
  console.log(event); // logs "connected" or "disconnected"
});
const awareness = provider.awareness

export default {
  ydoc,
  provider,
  awareness
}

import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";


const DATA_KEY = "data"

export default function (context) {
  if (!context.options.yjs) {
    return
  }

  const ydoc = new Y.Doc();
  const searchParams = new URLSearchParams(window.location.search);
  // const hostName = 'ws://localhost:3000/ws'
  const hostName = searchParams.has("host")
    ? searchParams.get("host")
    : "ws://localhost:3000/ws";
  const provider = new WebsocketProvider(hostName, "vue-sample", ydoc);
  provider.on("status", (event) => {
    console.log("WebsocketProvider", event); // logs "connected" or "disconnected"
  });

  
  const ymap = ydoc.getMap(context.store.$id);
  context.store.$onAction(({ after }) => {
    after(() => {
      ymap.set(DATA_KEY, context.store.$state)
    })
  })
  ymap.observe(ymapEvent => {
    const dataObj = ymapEvent.target.get(DATA_KEY)
    console.log("ymap.observe", dataObj)
    context.store.$patch(dataObj)
  })


}



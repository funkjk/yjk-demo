
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


// const delta = dmp.diff_toDelta(diff)
//console.log(delta)
// let pos =0
// let delta = []
// for (let d of diff) {
//   console.log(d)
//   pos += d[1].length
//   // [{ insert: 'a' }, { insert: 'bc', attributes: { bold: true }}]
//   if (d[0] !== DiffMatchPatch.DIFF_INSERT)  {
//     delta.push({insert:d[1]})
//   }
// }

// console.log(delta)
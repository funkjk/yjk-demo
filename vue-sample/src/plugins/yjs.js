
import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";

import useMyEditorStore from '@/store/MyEditor';


export default {
  install: (app) => {
    const editorStore = useMyEditorStore();
    const { setAll } = editorStore;
    
    
    const ydoc = new Y.Doc();
    const ymap = ydoc.getMap("map");
    app.provide('ymap', ymap)
    const searchParams = new URLSearchParams(window.location.search);
    // const hostName = 'ws://localhost:3000/ws'
    const hostName = searchParams.has("host")
      ? searchParams.get("host")
      : "ws://localhost:3000/ws";
    const provider = new WebsocketProvider(hostName, "vue-sample", ydoc);
    provider.on("status", (event) => {
      console.log(event); // logs "connected" or "disconnected"
    });
    
    ydoc.on("update", (update, origin, doc, tr) => {
      if (update || origin || doc || tr) {
        // this.ydata = doc.get("map").toJSON();
        setAll(doc.get("map").toJSON())
      }
      // console.log("update",update)
      // console.log("origin",origin)
      // console.log("doc",doc)
      // console.log("tr",tr)
    });
  }
}



import * as Y from "yjs";
import { WebsocketProvider } from "y-websocket";
import { notify } from "@kyvg/vue3-notification";


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
  const awareness = provider.awareness
  awareness.on('change', ({ added, updated, removed }) => {

    const edited = added.concat(updated)
    for (let id of edited) {
      const state = awareness.getStates().get(id)
      console.log("awareness onChange", state)
      if (state.set) {
        notify({
          title: "Awareness onChange",
          text: `${state.user.name} change ${state.set.key}`,
          duration: 10000,
          data:{color:state.user.color}
        });
        }
      }

  })
  awareness.on('update', ({ added, updated, removed }) => {
    // console.log("awareness onUpdate", Array.from(awareness.getStates().values()))
    // console.log("awareness onUpdate", added,updated,removed)

  })
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  const name = makeid(5)
  awareness.setLocalStateField('user', {
    name: name,
    color: '#' + randomColor // should be a hex color
  })

  const ymap = ydoc.getMap(context.store.$id);
  context.store.$onAction(({ after, args, name }) => {
    after((resolvedValue) => {
      console.log("after", resolvedValue)
      ymap.set(DATA_KEY, context.store.$state)
      if (name == "set") {
        awareness.setLocalStateField('set', {
          key: args[0],
          value: args[1]
        })
        }
    })
  })
  ymap.observe(ymapEvent => {
    const dataObj = ymapEvent.target.get(DATA_KEY)
    console.log("ymap.observe", dataObj)
    context.store.$patch(dataObj)
  })


}


function makeid(length) {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

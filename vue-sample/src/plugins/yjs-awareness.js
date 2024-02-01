

import yjs from '@/middleware/yjs'

import { notify } from "@kyvg/vue3-notification";
import useAwarenessStateStore from '@/store/AwarenessState';


export default {
  install: (app, options) => {


    const awareness = yjs.provider.awareness
    awareness.on('change', ({ added, updated, removed }) => {
      console.log('change', added, updated, removed)
      for (let id of added) {
        const state = awareness.getStates().get(id)
        const message = (state && state.user) ? `${state.user.name}(${id}) Added`: `${id}(Name not found) Added`
        const color = (state && state.user) ?  state.user.color : 'black'
        notify({
          title: "Awareness User Added",
          text: message,
          duration: 10000,
          data: { color: color }
        });
      }
      for (let id of removed) {
        notify({
          title: "Awareness User removed",
          text: `${id} removed`,
          duration: 10000,
          data: { color: 'blue' }
        });
      }
    })

    awareness.on('update', ({ added, updated, removed }) => {
      console.log("awareness onUpdate", awareness.getStates())
      const awarenessState = useAwarenessStateStore()
      awarenessState.setAll(Object.fromEntries(awareness.getStates()))
    })
    const randomColor = Math.floor(Math.random() * 16777215).toString(16);
    const name = makeid(3)
    awareness.setLocalStateField('user', {
      name: name,
      color: '#' + randomColor // should be a hex color
    })
    const awarenessState = useAwarenessStateStore()
    awarenessState.setCurrentClientID(awareness.clientID)

    window.addEventListener('beforeunload', () => {
      awareness.destroy()
    })

  }
}



function makeid(length) {
  let result = '';
  // const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

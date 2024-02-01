
import yjs from '@/middleware/yjs'


const DATA_KEY = "data"

export default function (context) {
  if (!context.options.yjs) {
    return
  }

  const ydoc = yjs.ydoc
  const ymap = ydoc.getMap(context.store.$id);
  context.store.$onAction(({ after, args, name }) => {
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


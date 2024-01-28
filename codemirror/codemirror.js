/* eslint-env browser */

// @ts-ignore
import CodeMirror from 'codemirror'
import * as Y from 'yjs'
import { WebsocketProvider } from 'y-websocket'
import { CodemirrorBinding } from 'y-codemirror'
import 'codemirror/mode/javascript/javascript.js'

window.addEventListener('load', () => {
  const ydoc = new Y.Doc()
  const searchParams = new URLSearchParams(window.location.search)
  // const hostName = 'ws://localhost:3000/ws'
  const hostName = searchParams.has("host") ? searchParams.get("host") : 'wss://demos.yjs.dev/ws'
  const provider = new WebsocketProvider(
    hostName, // use the public ws server
    // `ws${location.protocol.slice(4)}//${location.host}/ws`, // alternatively: use the local ws server (run `npm start` in root directory)
    'codemirror-demo',
    ydoc
  )
  const ytext = ydoc.getText('codemirror')
  const editorContainer = document.createElement('div')
  editorContainer.setAttribute('id', 'editor')
  document.body.insertBefore(editorContainer, null)

  const editor = CodeMirror(editorContainer, {
    mode: 'javascript',
    lineNumbers: true
  })

  const binding = new CodemirrorBinding(ytext, editor, provider.awareness)

  const connectBtn = /** @type {HTMLElement} */ (document.getElementById('y-connect-btn'))
  connectBtn.addEventListener('click', () => {
    if (provider.shouldConnect) {
      provider.disconnect()
      connectBtn.textContent = 'Connect'
    } else {
      provider.connect()
      connectBtn.textContent = 'Disconnect'
    }
  })

  // @ts-ignore
  window.example = { provider, ydoc, ytext, binding, Y }
})

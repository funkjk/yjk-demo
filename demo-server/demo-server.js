
/**
 * @type {any}
 */
const WebSocket = require('ws')
const http = require('http')
const StaticServer = require('node-static').Server
const ywsUtils = require('y-websocket/bin/utils')
const mongo= require( 'y-mongodb-provider');
const Y= require( 'yjs');
const setupWSConnection = ywsUtils.setupWSConnection
const docs = ywsUtils.docs
const env = require('lib0/environment')
const nostatic = env.hasParam('--nostatic')

const production = process.env.PRODUCTION != null
const port = process.env.PORT || 3000

const staticServer = nostatic ? null : new StaticServer('../')

function createConnectionString(dbname) {
  return `mongodb://admin:admin@localhost/${dbname}?retryWrites=true&w=majority`
}

const mdb = new mongo.MongodbPersistence(createConnectionString('yjstest'), {
	collectionName: 'transactions',
	flushSize: 100,
	multipleCollections: true,
});
ywsUtils.setPersistence({
	bindState: async (docName, ydoc) => {
		// Here you listen to granular document updates and store them in the database
		// You don't have to do this, but it ensures that you don't lose content when the server crashes
		// See https://github.com/yjs/yjs#Document-Updates for documentation on how to encode
		// document updates

		// official default code from: https://github.com/yjs/y-websocket/blob/37887badc1f00326855a29fc6b9197745866c3aa/bin/utils.js#L36
		const persistedYdoc = await mdb.getYDoc(docName);
		const newUpdates = Y.encodeStateAsUpdate(ydoc);
		mdb.storeUpdate(docName, newUpdates);
		Y.applyUpdate(ydoc, Y.encodeStateAsUpdate(persistedYdoc));
		ydoc.on('update', async (update) => {
			mdb.storeUpdate(docName, update);
		});
	},
	writeState: async (docName, ydoc) => {
		// This is called when all connections to the document are closed.
		// In the future, this method might also be called in intervals or after a certain number of updates.
		return new Promise((resolve) => {
			// When the returned Promise resolves, the document will be destroyed.
			// So make sure that the document really has been written to the database.
			resolve();
		});
	},
});




const server = http.createServer((request, response) => {
  if (request.url === '/health') {
    response.writeHead(200, { 'Content-Type': 'application/json' })
    response.end(JSON.stringify({
      response: 'ok'
    }))
    return
  }

  if (staticServer && !(request.url || '').startsWith('/ws/')) {
    request.addListener('end', () => {
      staticServer.serve(request, response)
    }).resume()
  }
})
const wss = new WebSocket.Server({ server })

wss.on('connection', (conn, req) => {
  setupWSConnection(conn, req, { gc: req.url.slice(1) !== 'ws/prosemirror-versions' })
})

// log some stats
setInterval(() => {
  let conns = 0
  docs.forEach(doc => { conns += doc.conns.size })
  const stats = {
    conns,
    docs: docs.size,
    websocket: `ws://localhost:${port}`,
    http: `http://localhost:${port}`
  }
  console.log(`${new Date().toISOString()} Stats: ${JSON.stringify(stats)}`)
}, 10000)

server.listen(port, '0.0.0.0')

console.log(`Listening to http://localhost:${port} (${production ? 'production + ' : ''} ${nostatic ? 'no static content' : 'serving static content'})`)





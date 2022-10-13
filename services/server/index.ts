require('dotenv').config()

const http = require('http')
const app = require('./Main')
const {handleUnhandledRejection, handleUncaughtExceptions} = require('./error/serverError')

import ConnectDB from './db/connect'

const server = http.createServer(app)

async function startServer () {
    handleUnhandledRejection(server)
    handleUncaughtExceptions()
    await ConnectDB()
    server.listen(process.env.PORT, () => console.log('😎Hidden cms v1.0 running at port:', process.env.PORT))
}

startServer()
    .then(()=>console.log('started'))
    .catch(e => console.log(e))
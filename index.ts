require('dotenv').config()

const http = require('http')


const server = http.createServer()

async function startServer () {
    server.listen(process.env.PORT, () => console.log('Hidden cms v1.0 running at port: ', process.env.PORT))
}

startServer()
    .then(()=>console.log('started'))
    .catch(e => console.log(e))
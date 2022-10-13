import {Server} from "http";

function handleUnhandledRejection(server: Server) {
    return process.on('unhandledRejection', (err: Error) => {
        reportError(err)
        console.log('Unhandled Rejection, closing app gracefully!')
        // todo: emit event for auth service closing
        server.close(() => process.exit(0))
    })
}

function handleUncaughtExceptions () {
    return process.on('uncaughtException', (err: Error) => {
        reportError(err)
        console.log('Uncaught Exception, closing gracefully!')
        process.exit(0)
    })
}

function reportError (err: Error) {
    console.log(err.name, err.message)
}

module.exports = {
    handleUncaughtExceptions,
    handleUnhandledRejection
}
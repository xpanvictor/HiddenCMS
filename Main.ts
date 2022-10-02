import express, {Application, Request, Response, NextFunction} from 'express'
const bodyParser = require('body-parser')

class App {
    app: Application

    constructor() {
        this.app = express()
        this.config()
    }

    private config () {
        console.log('Setting up middlewares')
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE')
            res.header('Access-Control-Allow-Headers', '*')
            res.send('Received')
            next()
        })
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({
            extended: false
        }))
    }
}

module.exports = new App().app
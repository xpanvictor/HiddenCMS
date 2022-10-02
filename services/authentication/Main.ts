import express, {Application, Request, Response, NextFunction} from 'express'
const bodyParser = require('body-parser')
//routes
const UserRouter = require('./routes/user')

class App {
    app: Application

    constructor() {
        this.app = express()
        this.config()
        this.applyRouters()
        this.app.use('/', (_, res: Response) => {
            res.send('Welcome to the authentication service dev container')
        })
    }

    private config () {
        console.log('Setting up middlewares')
        this.app.use((req: Request, res: Response, next: NextFunction) => {
            res.header('Access-Control-Allow-Origin', '*')
            res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PATCH, DELETE')
            res.header('Access-Control-Allow-Headers', '*')
            next()
        })
        this.app.use(bodyParser.json())
        this.app.use(bodyParser.urlencoded({
            extended: false
        }))
        console.log('Testing dependent database service')

    }

    private applyRouters() {
        new UserRouter(this.app)
    }
}

module.exports = new App().app
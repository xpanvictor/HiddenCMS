import express, {Application, Request, Response, NextFunction} from 'express'
//middlewares_essential
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
import helmet from 'helmet'
//routes
const UserRouter = require('./routes/user')
const PostRouter = require('./routes/post')

class App {
    app: Application

    constructor() {
        this.app = express()
        this.config()
        this.applyRouters()
        this.app.use('/', (_, res: Response) => {
            res.send('Welcome to the server service dev container')
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
        this.app.use(helmet())
        this.app.use(mongoSanitize())
        console.log('Testing dependent database service')

    }

    private applyRouters() {
        new UserRouter(this.app)
        new PostRouter(this.app)
    }
}

module.exports = new App().app
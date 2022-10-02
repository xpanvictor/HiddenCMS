import {Application, Router, Request, Response} from "express";

class UserRouter {
    router: Router

    constructor(app: Application) {
        this.router = Router()
        this.applyRoutes()
        app.use('/user', this.router)
    }

    private applyRoutes() {
        this.router.use('/', (req: Request, res: Response) => {
            res.send('Hello user')
        })
    }
}

module.exports = UserRouter
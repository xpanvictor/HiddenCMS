import {Application, Router} from "express";
const UserController = require('../controllers/UserController')

class UserRouter {
    router: Router

    constructor(app: Application) {
        this.router = Router()
        this.applyRoutes()
        app.use('/user', this.router)
    }

    private applyRoutes() {
        this.router.post('/', (...args) => new UserController(...args).createUser())
    }
}

module.exports = UserRouter
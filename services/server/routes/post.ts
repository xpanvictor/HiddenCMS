import {Application, Router} from "express";
const PostController = require('../controllers/PostController')

class PostRouter {
    router: Router

    constructor(app: Application) {
        this.router = Router()
        this.applyRoutes()
        app.use('/post', this.router)
    }

    private applyRoutes() {
        this.router.get('/', (...args) => new PostController(...args).posts())
    }
}

module.exports = PostRouter
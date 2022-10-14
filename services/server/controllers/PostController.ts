import {Request, Response, NextFunction} from "express";
import BaseController from "./BaseController";
const {Status} = require('../constants/enums')
const Post = require('../db/models/Post')

class PostController extends BaseController {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    public get posts() {
        this.populateData(Status.Success, 'All posts generated')
        return this.respond()
    }

    public create_post() {
        const {title} = this.req.body
        const post = new Post({

        })
        post.save()
        console.log("post", post)
        this.populateData(200, "Res", title)
        this.respond()
    }
}

module.exports = PostController
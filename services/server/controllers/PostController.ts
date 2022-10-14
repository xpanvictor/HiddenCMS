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

    public async create_post() {
        const {title, excerpt, _html,} = this.req.body
        if (!title || !_html) {
            this.populateData(Status.BadRequest, "Required fields not filled!")
            return this.respond()
        }
        const post = new Post({
            title,
            excerpt,
            _html
        })
        const saved_post = await post.save()
        this.populateData(Status.NewData, "Post saved successfully", saved_post)
        this.respond()
    }
}

module.exports = PostController
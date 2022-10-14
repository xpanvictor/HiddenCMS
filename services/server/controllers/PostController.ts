import {Request, Response, NextFunction} from "express";
import BaseController from "./BaseController";
const {Status} = require('../constants/enums')
const Post = require('../db/models/Post')

class PostController extends BaseController {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    public async posts() {
        let {page, size, search} = <{page: number, size: number, search?: string}><unknown>this.req.query
        size = size || 10

        const posts = await Post.find(
            {},
            {title: 1, excerpt: 1, likes: 1, tags: 1, updatedAt: 1},
            //absolute value for security of passing negative num, haha
            {skip: Math.abs(page -  1 || 0) * size, limit: size, sort: {updatedAt: -1}}
        ).searchWithTitle(search)

        this.populateData(Status.Success, 'All posts generated', posts)
        return this.respond()
    }

    public async postById() {
        const {id} = this.req.params
        const post = await Post.findOne({_id: id})
        this.populateData(Status.Success, `Post with id ${id}`, post)
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
import {Request, Response, NextFunction} from "express";
import BaseController from "./BaseController";
const {Status} = require('../constants/enums')

class PostController extends BaseController {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    public get posts() {
        this.populateData(Status.Success, 'All posts generated')
        return this.respond()
    }
}

module.exports = PostController
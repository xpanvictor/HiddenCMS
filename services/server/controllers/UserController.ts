import {Request, Response, NextFunction} from "express";
import BaseController from "./BaseController";
const {Status} = require('../constants/enums')
const User = require('../db/models/User')

class UserController extends BaseController {
    constructor(req: Request, res: Response, next: NextFunction) {
        super(req, res, next);
    }

    public async createUser() {
        const {name, email, password} = this.req.body

        const user= new User({
            name,
            email,
            password
        })
        try{
            const saved_user = await user.save()
            this.populateData(Status.NewData, `User ${name} has been created`, saved_user)
        }catch(err: any) {
            console.log(err)
            this.populateData(Status.BadRequest, 'Invalid data', err)
        }
        this.respond()
    }
}

module.exports = UserController
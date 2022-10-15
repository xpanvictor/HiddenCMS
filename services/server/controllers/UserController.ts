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

    public async loginUser() {
        const {email, password} = this.req.body
        const user_requested = await User.findOne({email})
        if (!user_requested) {
            this.populateData(Status.NotFound, 'User not found')
            return this.respond()
        }
        if (await user_requested.comparePassword(password)) {
            this.populateData(Status.Success, `${email} logged in`, user_requested)
        }else{
            this.populateData(Status.BadRequest, 'Incorrect details')
        }
        return this.respond()
    }
}

module.exports = UserController
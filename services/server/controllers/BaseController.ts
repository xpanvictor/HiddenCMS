import {Request, Response, NextFunction} from "express";

enum Status {
    ServerError= 500,
    Success = 200,
    NewData = 201,
    Cached = 301,
    BadRequest = 400,
    Unauthorized = 401,
    InvalidSession = 403,
    NotFound = 404,
}

interface Reply {
    status: Status,
    message: string
    value: Record<string, any>
}

export default class BaseController {
    req: Request
    res: Response
    next: NextFunction

    declare private _data: Reply

    constructor (req: Request, res: Response, next: NextFunction) {
        this.req = req
        this.res = res
        this.next = next
    }

    public populateData(data: Partial<Reply>) {
        this._data = {
            status: data.status || Status.ServerError,
            message: data.message || 'No response from server, try again later!',
            value: data.value || {}
        }
    }

    public respond() {
        if (!this._data.status) {
            this.populateData({})
        }
        this.res.json(this._data)
    }

}
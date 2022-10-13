import {Request, Response, NextFunction} from "express";
const {Status} = require('../constants/enums')

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

    public populateData(status?: Status, message?: string, value?: any) {
        this._data = {
            status: status || Status.ServerError,
            message: message || 'No response from server, try again later!',
            value: value || {}
        }
    }

    public respond() {
        if (!this._data.status) {
            this.populateData()
        }
        this.res.json(this._data)
    }

}
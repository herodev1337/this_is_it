import { Request, Response } from 'express'
import { omit } from 'lodash'
import { CreateUserInput } from '../schema/user.schema'
import { createUser } from '../service/user.service'
import log from '../utils/logger'

/**
 * Tries to create a user
 * @param  {Request} req
 * @param  {Response} res
 */
export async function createUserHandler(req: Request<{}, {}, CreateUserInput["body"]>, res: Response){
    try{
        //try to create user...
        const user = await createUser(req.body)

        //return user object without password
        return res.json(omit(user.toJSON(), "password"))
    }catch(e: any){
        //log error and return 409 (Conflict)
        log.error(e)
        return res.status(409).json(e.message)
    }
}

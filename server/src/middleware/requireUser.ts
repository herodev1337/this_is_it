import { Request, Response, NextFunction } from "express";

/**
 * ! Middleware Function !
 * Checks if the user is set
 * ? Group management later inside here
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
const requireUser = (req: Request, res: Response, next: NextFunction) => {

    const user = res.locals.user

    if(!user){
        return res.sendStatus(403)
    }
    return next()
}

export default requireUser
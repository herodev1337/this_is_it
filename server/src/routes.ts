import { Express, Request, Response } from 'express'
import { createUserHandler } from './controller/user.controller'
import { createUserSchema } from './schema/user.schema'
import { validate as validateRequest } from './middleware/validateRequest'
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from './controller/session.controller'
import { createSessionSchema } from './schema/session.schema'
import requireUser from './middleware/requireUser'

export default function(app: Express){
    /* HEALTH CHECK */
    app.get('/', (req: Request, res: Response) => { res.sendStatus(200) })

    
    /* AUTH */
    //Register User - POST - /api/auth/register
    app.post('/api/auth/register', validateRequest(createUserSchema), createUserHandler)

    //Login - POST - /api/auth/sessions
    app.post('/api/auth/sessions', validateRequest(createSessionSchema), createUserSessionHandler)

    //Get the users sessions - GET - /api/auth/sessions
    app.get('/api/auth/sessions', requireUser, getUserSessionsHandler)

    //Logout - DEL - /api/auth/sessions
    app.delete('/api/auth/sessions', requireUser, deleteUserSessionHandler)

} 
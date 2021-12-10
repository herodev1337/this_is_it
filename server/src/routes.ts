import { Express, Request, Response } from 'express'
import { createUserHandler } from './controller/user.controller'
import { createUserSchema } from './schema/user.schema'
import { validate as validateRequest } from './middleware/validateRequest'
import { createUserSessionHandler, deleteUserSessionHandler, getUserSessionsHandler } from './controller/session.controller'
import { createSessionSchema } from './schema/session.schema'
import requireUser from './middleware/requireUser'
import { createQuizSchema } from './schema/quiz.schema'
import { createQuizHandler, deleteQuizHandler, getQuizHandler, getQuizListHandler, updateQuizHandler } from './controller/quiz.controller'

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


    /* QUIZ */

    //Get a list of all quizzes - GET - /api/quiz
    app.get('/api/quiz/', getQuizListHandler)
  
    //Get a specific quiz - GET - /api/quiz
    app.get('/api/quiz/:quizId', getQuizHandler)

    //Create a Quiz - POST - /api/quiz/
    app.post('/api/quiz/', requireUser, validateRequest(createQuizSchema), createQuizHandler)

    //Update a Quiz - PUT - /api/quiz/:quizId
    app.put('/api/quiz/:quizId', requireUser, updateQuizHandler)

    //Delete a Quiz - DELETE - /api/quiz/:quizId
    app.delete('/api/quiz/:quizId', requireUser, deleteQuizHandler)

} 
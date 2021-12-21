import { Request, Response } from 'express';
import {
  createQuiz,
  deleteQuiz,
  findQuiz,
  getQuizList,
  updateQuiz,
} from '../service/quiz.service';
import log from '../utils/logger';

/**
 * Creates a quiz with the quiz body
 * @param  {Request} req
 * @param  {Response} res
 */
export async function createQuizHandler(req: Request, res: Response) {
  try {
    const quiz = await createQuiz(req.body);

    return res.json(quiz);
  } catch (error: any) {
    log.error(error);
    return res.status(409).json(error.message);
  }
}
/**
 * Updates a quiz with its given id in req.params and content from req.body
 * @param  {Request} req
 * @param  {Response} res
 */
export const updateQuizHandler = async (req: Request, res: Response) => {
  try {
    const quiz = await updateQuiz({ _id: req.params.quizId }, req.body);

    return res.status(200).json(quiz); //TODO
  } catch (error: any) {
    log.error(error);
    return res.status(409).json(error.message);
  }
};

/**
 * Gets all quizzes that are enabled
 * TODO: show all quizzes for admins
 * @param  {Request} req
 * @param  {Response} res
 */
export const getQuizListHandler = async (req: Request, res: Response) => {
  try {
    const quiz = await getQuizList({ isEnabled: true });

    return res.status(200).json(quiz);
  } catch (error: any) {
    log.error(error);
    return res.status(409).json(error.message);
  }
};

/**
 * Gets a specific quiz with its id
 * @param  {Request} req
 * @param  {Response} res
 */
export const getQuizHandler = async (req: Request, res: Response) => {
  try {
    const quiz = await findQuiz({ _id: req.params.quizId });

    return res.status(200).json(quiz);
  } catch (error: any) {
    log.error(error);
    return res.status(409).json(error.message);
  }
};

/**
 * Deletes a specific quiz with id from req.params
 * @param  {Request} req
 * @param  {Response} res
 */
export const deleteQuizHandler = async (req: Request, res: Response) => {
  try {
    const quiz = await deleteQuiz({ _id: req.params.quizId });

    return res.status(200).json(quiz); //TODO
  } catch (error: any) {
    log.error(error);
    return res.status(409).json(error.message);
  }
};

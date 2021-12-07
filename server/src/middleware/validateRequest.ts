import { AnyZodObject } from 'zod';
import { Request, Response, NextFunction } from 'express';
import log from '../utils/logger';

/**
 * Compares the given schema with the data within the request
 * @param  {AnyZodObject} schema
 */
export const validate = (schema: AnyZodObject) => async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    return next();
  } catch (e: any) {
    log.error(e);
    return res.status(400).json(e.errors);
  }
};

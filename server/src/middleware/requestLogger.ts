import { Request, Response, NextFunction } from 'express';
import log from '../utils/logger';

/**
 * ! Middleware Function !
 * Logs each request with their IP and URL
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
function requestLogger(req: Request, res: Response, next: NextFunction) {
  log.info(`[${req.socket.remoteAddress}] ${req.method} - ${req.url}`);
  res.on('finish', () => {
    log.info(
      `[${req.socket.remoteAddress}] ${req.method} - ${req.url} - [${res.statusCode}]`
    );
  });
  next();
}

export default requestLogger;

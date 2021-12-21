import { Request, Response } from 'express';
import config from 'config';
import {
  createSession,
  findSessions,
  updateSession,
} from '../service/session.service';
import { validatePassword } from '../service/user.service';
import { signJwt } from '../utils/jwt.utils';

/**
 * Validates the users credentials and creates an accessToken and refreshToken.
 * Uses RS256
 * @param  {Request} req
 * @param  {Response} res
 */
export async function createUserSessionHandler(req: Request, res: Response) {
  // Validate the users password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid email or password');
  }

  // Create a session
  let userId: string = user._id;
  let userAgent: string = req.get('user-agent') || 'Not found';
  let userIpAddress: string =
    <string>req.headers['x-forwarded-for'] ||
    req.socket.remoteAddress ||
    'Not found';

  const session = await createSession(userId, userAgent, userIpAddress);

  // create an access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    'accessTokenPrivateKey',
    { expiresIn: config.get('accessTokenTimeToLive') }
  );

  // create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    'refreshTokenPrivateKey',
    { expiresIn: config.get('refreshTokenTimeToLive') }
  );

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

/**
 * Returns all sessions from the user
 * @param  {Request} req
 * @param  {Response} res
 */
export async function getUserSessionsHandler(req: Request, res: Response) {
  const userId = res.locals.user._id;

  const sessions = await findSessions({ user: userId, valid: true });

  return res.send(sessions);
}

/**
 * Deletes the locals user session
 * @param  {Request} req
 * @param  {Response} res
 */
export async function deleteUserSessionHandler(req: Request, res: Response) {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
}

import { get } from 'lodash';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

/**
 * ! Middleware Function !
 * Gets the different headers (if set) and puts the user in local variables
 * @param  {Request} req
 * @param  {Response} res
 * @param  {NextFunction} next
 */
const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //Gets the accessToken from the headers or returns ""
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  //Gets the refresh from the headers or returns ""
  const refreshToken = get(req, 'headers.x-refresh');

  //accessToken empty? Go on with the request as unauthenticated
  if (!accessToken) return next();

  //Else verify that the token is genuine
  const { decoded, expired } = verifyJwt(accessToken, 'accessTokenPublicKey');

  //If token is genuine...
  if (decoded) {
    //...put the user in variables
    res.locals.user = decoded;
    return next();
  }

  //If accessToken is expired but refreshToken is set, get a new accessToken
  if (expired && refreshToken) {
    //Check if refreshToken is valid and get new accessToken
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    //If accessToken != null -> setHeader with accessToken
    if (newAccessToken) res.setHeader('x-access-token', newAccessToken);

    //Gets the user...
    const result = verifyJwt(newAccessToken as string, 'accessTokenPublicKey');

    //...and puts the user into the local variables
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;

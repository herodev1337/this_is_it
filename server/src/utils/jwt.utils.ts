import jwt from 'jsonwebtoken';
import config from 'config';
import log from './logger';

/**
 * Signs the object and return the jwt token
 * @param  {Object} object
 * @param  {'accessTokenPrivateKey'|'refreshTokenPrivateKey'} keyName
 * @param  {jwt.SignOptions|undefined} options
 */
function signJwt(object: Object, keyName: 'accessTokenPrivateKey' | 'refreshTokenPrivateKey', options?: jwt.SignOptions | undefined) {
  const signingKey = Buffer.from(
    config.get<string>(keyName),
    'base64'
  ).toString('ascii');
  
  return jwt.sign(object, signingKey, {
    ...(options && options),
    algorithm: 'RS256',
  });
}

/**
 * Verifies the jwt token
 * @param  {string} token
 * @param  {'accessTokenPublicKey'|'refreshTokenPublicKey'} keyName
 */
function verifyJwt(token: string, keyName: 'accessTokenPublicKey' | 'refreshTokenPublicKey') {
  const publicKey = Buffer.from(config.get<string>(keyName), 'base64').toString('ascii');

  try {
    const decoded = jwt.verify(token, publicKey, { algorithms: ['RS256'] });
    return {
      valid: true,
      expired: false,
      decoded,
    }
  } catch (e: any) {
    log.error(e.message);
    return {
      valid: false,
      expired: e.message === 'jwt expired',
      decoded: null,
    }
  }
}

export { signJwt, verifyJwt };

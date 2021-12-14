import Session, { SessionDocument } from '../model/session.model';
import config from 'config';
import { FilterQuery, LeanDocument, UpdateQuery } from 'mongoose';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import { get } from 'lodash';
import { findUser } from './user.service';

/**
 * Create a Session
 * @param  {string} userId
 * @param  {string} userAgent
 * @param  {string} ipAddress
 */
export async function createSession(userId: string, userAgent: string, ipAddress: string) {
  const session = await Session.create({ user: userId, userAgent, ipAddress });

  return session.toJSON();
}
/**
 * Checks if refreshToken is valid and return a new accessToken
 * @param  {string} refreshToken
 */
export async function reIssueAccessToken({ refreshToken }:{ refreshToken:string }) {
  const { decoded } = verifyJwt(refreshToken, "refreshTokenPublicKey");

  if (!decoded || !get(decoded, "session")) return false;

  const session = await Session.findById(get(decoded, "session"));

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    "accessTokenPrivateKey",
    { expiresIn: config.get("accessTokenTimeToLive") } // 15 minutes
  );

  return accessToken;
}
/**
 * Finds all sessions
 * @param  {FilterQuery<SessionDocument>} query
 */
export async function findSessions(query: FilterQuery<SessionDocument>) {
  return Session.find(query).lean();
}

export async function updateSession(
  query: FilterQuery<SessionDocument>, update: UpdateQuery<SessionDocument>) {
  return Session.updateOne(query, update);
}
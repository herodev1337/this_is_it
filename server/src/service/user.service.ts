import User, { UserDocument } from '../model/user.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import { omit } from 'lodash';

/**
 * Creates a new user
 * @param  {UserDocument} input
 */
export async function createUser(
  input: DocumentDefinition<
    Omit<UserDocument, 'createdAt' | 'updatedAt' | 'comparePassword'>
  >
) {
  try {
    return await User.create(input);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

/**
 * Checks if the password is right
 * @param  {string} username
 * @param  {string} password
 */
export async function validatePassword({
  username,
  password,
}: {
  username: string;
  password: string;
}) {
  const user = await User.findOne({ username });

  if (!user) {
    return false;
  }
  const isValid = await user.comparePassword(password);

  if (!isValid) return false;
  
  return <UserDocument>omit(user.toJSON(), 'password');
}

/**
 * Finds a user
 * @param  {FilterQuery<UserDocument>} query
 */
export async function findUser(query: FilterQuery<UserDocument>) {
  return User.findOne(query).lean();
}

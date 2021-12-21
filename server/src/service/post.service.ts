import Post, { PostDocument } from '../model/post.model';
import { DocumentDefinition, FilterQuery } from 'mongoose';
import { ObjectId } from 'mongodb';

export async function createPost(
  input: DocumentDefinition<
    Omit<PostDocument, 'createdAt' | 'updatedAt' | 'likes' | 'edits'>
  >
) {
  try {
    return await Post.create(input);
  } catch (error: any) {
    throw new Error(error.message);
  }
}

export async function findPost(query: FilterQuery<PostDocument>) {
  return Post.findOne(query).lean();
}

export async function getPostList(query: FilterQuery<PostDocument>) {
  return Post.find(query).lean();
}

export async function updatePost(
  query: FilterQuery<PostDocument>,
  newPost: DocumentDefinition<
    Omit<PostDocument, 'createdAt' | 'updatedAt' | 'likes' | 'edits' | 'author'>
  >
) {
  return Post.updateOne(query, newPost);
}

export async function deletePost(query: FilterQuery<PostDocument>) {
  return Post.deleteOne(query);
}

export async function hasUserPostLiked(
  userId: string,
  postId: string
): Promise<Boolean> {
  let userHasLiked = await Post.find({ _id: postId }).countDocuments({
    likes: new ObjectId(userId),
  });
  return +userHasLiked > 0 ? true : false;
}

export async function likePost(userId: string, postId: string) {
  return Post.findOne({ _id: postId }).update({
    $push: { likes: new ObjectId(userId) },
  });
}

export async function dislikePost(userId: string, postId: string) {
  return Post.findOne({ _id: postId }).update({
    $pull: { likes: new ObjectId(userId) },
  });
}

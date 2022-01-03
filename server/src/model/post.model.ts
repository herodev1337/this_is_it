import mongoose from 'mongoose';
import dayjs from 'dayjs';
import { UserDocument } from './user.model';

export interface PostDocument extends mongoose.Document {
  title: String;
  description: String;
  isPublic: Boolean;
  postData: Object;
  author: UserDocument['_id'];
  likes: Array<UserDocument['_id']>;
  edits: Array<UserDocument['_id']>;
  createdAt: Date;
  updatedAt: Date;
}

const postSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: `Post ${dayjs().format('DD-MM-YYYY h-mm-ss')}`,
    },
    description: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    isPublic: { type: Boolean, default: false },
    postData: { type: Object, required: true },
    likes: { type: Array },
    edits: { type: Array },
  },
  { timestamps: true }
);

const Post = mongoose.model<PostDocument>('Post', postSchema);

export default Post;

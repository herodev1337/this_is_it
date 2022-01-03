import { boolean, object, string } from 'zod';

//FIXME: Extend zod validation schema
export const createPostSchema = object({
  body: object({
    title: string(),
    description: string(),
    isPublic: boolean(),
    postData: object({}),
  }),
});

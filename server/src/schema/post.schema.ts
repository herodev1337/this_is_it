import { boolean, object, string } from "zod"

export const createPostSchema = object({
    body: object({
        title: string(),
        description: string(),
        isPublic: boolean(),
        postData: object({})
    })
})

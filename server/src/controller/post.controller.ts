import { Request, Response } from 'express'
import { createPost, deletePost, findPost, getPostList, updatePost } from '../service/post.service'
import log from '../utils/logger'

export async function createPostHandler(req: Request, res: Response){
    try {
        req.body.author = res.locals.user._id; //TODO: Better method available?
        const post = await createPost(req.body)

        return res.json(post)
    }catch(error: any){
        log.error(error)
        return res.status(409).json(error.message);
    }
}

export const updatePostHandler = async (req: Request, res: Response) => {
    try{
        const post = await updatePost({_id: req.params.postId}, req.body)

        return res.status(200).json(post) //TODO
    }catch(error: any){
        log.error(error)
        return res.status(409).json(error.message)
    }
}

export const getPostListHandler = async (req: Request, res: Response) => {
    try{
        const post = await getPostList({isPublic: true})

        return res.status(200).json(post)
    }catch(error: any){
        log.error(error)
        return res.status(409).json(error.message)
    }
}

export const getPostHandler = async (req: Request, res: Response) => {
    try{
        const post = await findPost({_id: req.params.postId})

        return res.status(200).json(post)
    }catch(error: any){
        log.error(error)
        return res.status(409).json(error.message)
    }
}

export const deletePostHandler = async(req: Request, res: Response) => {
    try{
        const post = await deletePost({_id: req.params.postId})

        return res.status(200).json(post) //TODO
    }catch(error: any){
        log.error(error)
        return res.status(409).json(error.message)
    }
}

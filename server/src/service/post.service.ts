import Post, { PostDocument } from '../model/post.model'
import config from 'config'
import { DocumentDefinition, FilterQuery } from 'mongoose'

export async function createPost(input: DocumentDefinition<Omit<PostDocument, 'createdAt' | 'updatedAt' | 'likes' | 'edits'>>){
//export async function createPost(userId: string, title: string, description: string, isPublic: boolean, postData: Object){
    try{ 
        return await Post.create(input)//{author: userId, title, description, isPublic, postData})
    }catch(error: any){
        throw new Error(error.message)
    }
}

export async function findPost(query: FilterQuery<PostDocument>){
    return Post.findOne(query).lean()
}

export async function getPostList(query: FilterQuery<PostDocument>){
    return Post.find(query).lean()
}

export async function updatePost(query: FilterQuery<PostDocument>, newPost: DocumentDefinition<Omit<PostDocument, 'createdAt' | 'updatedAt'| 'likes' | 'edits' | 'author'>>){
    return Post.updateOne(query, newPost)
}

export async function deletePost(query: FilterQuery<PostDocument>){
    return Post.deleteOne(query)
}
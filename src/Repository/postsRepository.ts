import {PostsInputType, PostsClass, BlogsClass} from "../Types/Types";
import {postsModel} from "../db/MongoDB";
import {ObjectId} from "mongodb";
import {injectable} from "inversify";


@injectable()
export class PostsRepository {

    async create(inputData: PostsInputType, blog: BlogsClass): Promise<string> {

        const newPost: PostsClass = new PostsClass(
            new ObjectId().toString(),
            inputData.title,
            inputData.shortDescription,
            inputData.content,
            blog.id,
            blog.name,
            new Date()
            )

        await postsModel.insertOne(newPost)
        return newPost.id
    }

    async update(id: string, newInfo: PostsInputType): Promise<boolean> {

        const result = await postsModel.updateOne(
            {id: id},
            {$set: {
                title: newInfo.title,
                shortDescription: newInfo.shortDescription,
                content: newInfo.content,
                blogId: newInfo.blogId
            }
        })
        return result.modifiedCount !== 0
    }

    async delete(id: string): Promise<boolean> {

        const result = await postsModel.deleteOne({id: id})
        return result.deletedCount !== 0
    }
}


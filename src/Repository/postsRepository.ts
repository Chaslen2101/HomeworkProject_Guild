import {postsInputType, postsViewType} from "../Types/Types";
import {postCollection} from "../db/MongoDB";
import {ObjectId} from "mongodb";
import {injectable} from "inversify";


@injectable()
export class PostsRepository {

    async create(inputData: postsInputType, blog: any) {

        const newPost: postsViewType = new postsViewType(
            new ObjectId().toString(),
            inputData.title,
            inputData.shortDescription,
            inputData.content,
            blog.id,
            blog.name,
            new Date().toISOString()
            )

        await postCollection.insertOne(newPost)
        return newPost.id
    }

    async update(id: string, newInfo: postsInputType) {
        const result = await postCollection.updateOne(
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

    async delete(id: string) {
        const result = await postCollection.deleteOne({id: id})
        return result.deletedCount !== 0
    }
}


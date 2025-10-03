import {blogsInputType, blogsViewType} from "../Types/Types";
import {blogCollection} from "../db/MongoDB";
import {DeleteResult, ObjectId, UpdateResult} from "mongodb";
import {injectable} from "inversify";


@injectable()
export class BlogsRepository {

    async create(newBlog: blogsInputType) {

        const createdBlog = new blogsViewType(
            new ObjectId().toString(),
            newBlog.name,
            newBlog.description,
            newBlog.websiteUrl,
            new Date().toISOString(),
            false
        )
        await blogCollection.insertOne(createdBlog)
        return createdBlog.id
    }

    async delete(id: string): Promise<boolean> {
        const result: DeleteResult = await blogCollection.deleteOne({id: id})
        return result.deletedCount !== 0
    }

    async update(id: string, newInfo: blogsInputType): Promise<boolean> {
        const result: UpdateResult = await blogCollection.updateOne(
            {id: id},
            {$set: {
                        name: newInfo.name,
                        description: newInfo.description,
                        websiteUrl: newInfo.websiteUrl
            }
        })
        return result.modifiedCount !== 0
    }
}
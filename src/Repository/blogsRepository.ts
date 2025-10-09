import {blogsInputType, BlogsClass} from "../Types/Types";
import {blogsModel} from "../db/MongoDB";
import {DeleteResult, ObjectId, UpdateResult} from "mongodb";
import {injectable} from "inversify";


@injectable()
export class BlogsRepository {

    async create(newBlog: blogsInputType): Promise<string> {

        const createdBlog: BlogsClass = new BlogsClass(
            new ObjectId().toString(),
            newBlog.name,
            newBlog.description,
            newBlog.websiteUrl,
            new Date().toISOString(),
            false
        )
        await blogsModel.insertOne(createdBlog)
        return createdBlog.id
    }

    async delete(id: string): Promise<boolean> {
        const result: DeleteResult = await blogsModel.deleteOne({id: id})
        return result.deletedCount !== 0
    }

    async update(id: string, newInfo: blogsInputType): Promise<boolean> {
        const result: UpdateResult = await blogsModel.updateOne(
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
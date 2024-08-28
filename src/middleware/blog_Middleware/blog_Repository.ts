import {blogsInputType, blogsViewType} from "../../db/Types";
import {db} from "../../db/db";


export const blog = {
    create(newBlog: blogsInputType) {
        const createdBlog: blogsViewType = {
            id: new Date().toISOString() + Math.random(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl
        }
        db.existingBlogs.push(createdBlog)
        return createdBlog
    },

    find(id: string) {
        return db.existingBlogs.find((blog: blogsViewType) => blog.id === id)
    },

    delete(index: number) {
        db.existingBlogs.splice(index,1)
    }
}
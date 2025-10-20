import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import {MongoClient, ServerApiVersion} from 'mongodb';
import {mongoSettings} from "../settings";
import {
    ApiRequestsInfoSchema, BlogsDBType, BlogsModelType,
    CommentsDBType, CommentsModelType,
    PostsDBType, PostsModelType,
    RefreshTokenPayloadSchema, SessionsInfoDBType, SessionsInfoModelType,
    UserDBType, UserModelType
} from "../Types/Types";
import {UserSchema} from "../Domain/usersSchemes";
import {SessionInfoSchema} from "../Domain/sessionsSchemes";
import {PostsSchema} from "../Domain/postsSchemes";
import {CommentsScheme} from "../Domain/commentsSchemes";
import {BlogsSchema} from "../Domain/blogsSchemes";

const url = process.env.MONGO_URL
if (!url) {
    throw new Error("DB URL missed")
}

const client = new MongoClient(url, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

export const db = client.db(mongoSettings.dbName)
export const BlogsModel = mongoose.model<BlogsDBType,BlogsModelType>(mongoSettings.blogCollectionName,BlogsSchema)
export const PostsModel = mongoose.model<PostsDBType,PostsModelType>(mongoSettings.postCollectionName,PostsSchema)
export const UsersModel = mongoose.model<UserDBType,UserModelType>(mongoSettings.userCollectionName,UserSchema)
export const CommentsModel = mongoose.model<CommentsDBType, CommentsModelType>(mongoSettings.commentCollectionName,CommentsScheme)
export const refreshTokenModel = mongoose.model(mongoSettings.refreshTokenBlackListName, RefreshTokenPayloadSchema)
export const apiRequestsInfoModel = mongoose.model(mongoSettings.apiRequestInfoCollectionName,ApiRequestsInfoSchema)
export const SessionsModel = mongoose.model<SessionsInfoDBType,SessionsInfoModelType>(mongoSettings.sessionsCollectionName,SessionInfoSchema)

export async function runDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await mongoose.connect(url!);
        console.log("You successfully connected to MongoDB!");
    } catch (error) {
        // Ensures that the client will close when you finish/error
        await client.close();
        console.error(error);
    }
}

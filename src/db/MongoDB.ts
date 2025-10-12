import dotenv from 'dotenv'
dotenv.config()
import mongoose from 'mongoose'
import {MongoClient, ServerApiVersion} from 'mongodb';
import {mongoSettings} from "../settings";
import {
    ApiRequestsInfoSchema,
    BlogsSchema,
    CommentsScheme,
    PostsSchema,
    RefreshTokenPayloadSchema,
    SessionInfoSchema,
    UserSchema
} from "../Types/Types";

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
export const blogsModel = mongoose.model(mongoSettings.blogCollectionName,BlogsSchema)
export const postsModel = mongoose.model(mongoSettings.postCollectionName,PostsSchema)
export const usersModel = mongoose.model(mongoSettings.userCollectionName,UserSchema)
export const commentsModel = mongoose.model(mongoSettings.commentCollectionName,CommentsScheme)
export const refreshTokenModel = mongoose.model(mongoSettings.refreshTokenBlackListName, RefreshTokenPayloadSchema)
export const apiRequestsInfoModel = mongoose.model(mongoSettings.apiRequestInfoCollectionName,ApiRequestsInfoSchema)
export const sessionsModel = mongoose.model(mongoSettings.sessionsCollectionName,SessionInfoSchema)

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

import dotenv from 'dotenv'
dotenv.config()
import mongoose, {Model} from 'mongoose'
import {MongoClient, ServerApiVersion} from 'mongodb';
import {mongoSettings} from "../settings";
import {
    apiRequestsInfoSchema,
    blogsSchema,
    commentsScheme,
    postsSchema,
    refreshTokenPayloadSchema,
    sessionInfoSchema,
    UserClass,
    userSchema
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
export const blogsModel = mongoose.model(mongoSettings.blogCollectionName,blogsSchema)
export const postsModel = mongoose.model(mongoSettings.postCollectionName,postsSchema)
export const usersModel = mongoose.model(mongoSettings.userCollectionName,userSchema)
export const commentsModel = mongoose.model(mongoSettings.commentCollectionName,commentsScheme)
export const refreshTokenModel = mongoose.model(mongoSettings.refreshTokenBlackListName, refreshTokenPayloadSchema)
export const apiRequestsInfoModel = mongoose.model(mongoSettings.apiRequestInfoCollectionName,apiRequestsInfoSchema)
export const sessionsModel = mongoose.model(mongoSettings.sessionsCollectionName,sessionInfoSchema)

export async function runDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        await mongoose.connect(url!);
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        // Ensures that the client will close when you finish/error
        await client.close();
        console.error(error);
    }
}

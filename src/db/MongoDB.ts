import dotenv from 'dotenv'
dotenv.config()
import {MongoClient} from 'mongodb';
import {mongoSettings} from "../settings";

const url = process.env.MONGO_URL
if (!url) {
    throw new Error("DB URL missed")
}
const client = new MongoClient(url)

export const db = client.db(mongoSettings.dbName)
export const blogCollection = db.collection(mongoSettings.blogCollectionName)
export const postCollection = db.collection(mongoSettings.postCollectionName)
export const userCollection = db.collection(mongoSettings.userCollectionName)
export const commentCollection = db.collection(mongoSettings.commentCollectionName)
export const refreshTokenCollection = db.collection(mongoSettings.refreshTokenBlackListName)
export const apiRequestInfoCollection = db.collection(mongoSettings.apiRequestInfoCollectionName)
export const sessionsCollection = db.collection(mongoSettings.sessionsCollectionName)

export const runDB = async () => {
    try {
        await client.connect();
        console.log("DB connected successfully")
    }catch {
        console.log("Cannot connect to DB")
        await client.close()
    }
}

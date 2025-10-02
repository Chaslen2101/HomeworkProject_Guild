import dotenv from 'dotenv'
dotenv.config()
import {MongoClient, ServerApiVersion} from 'mongodb';
import {mongoSettings} from "../settings";

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
export const blogCollection = db.collection(mongoSettings.blogCollectionName)
export const postCollection = db.collection(mongoSettings.postCollectionName)
export const userCollection = db.collection(mongoSettings.userCollectionName)
export const commentCollection = db.collection(mongoSettings.commentCollectionName)
export const refreshTokenCollection = db.collection(mongoSettings.refreshTokenBlackListName)
export const apiRequestInfoCollection = db.collection(mongoSettings.apiRequestInfoCollectionName)
export const sessionsCollection = db.collection(mongoSettings.sessionsCollectionName)


export async function runDB() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();
        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (error) {
        // Ensures that the client will close when you finish/error
        await client.close();
        console.error(error);
    }
}

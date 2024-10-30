import {apiRequestInfoCollection} from "../db/MongoDB";

export const apiRequestInfoRepository = {

    async addRequestInfo (ip: string | undefined, URL: string, date: Date): Promise<any> {
        await apiRequestInfoCollection.insertOne({ IP: ip, URL: URL, date: date });
        return
    },

    async findRequestInfo (ip: string | undefined, URL: string): Promise<any> {
        return await apiRequestInfoCollection.find({IP: ip, URL: URL}).toArray()
    },

    async deleteRequestInfo (ip: string | undefined, URL: string, date: Date): Promise<any> {
        await apiRequestInfoCollection.deleteMany({IP: ip, URL: URL, date: {$not:{$eq: date}}})
    }
}
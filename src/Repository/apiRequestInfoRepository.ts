import {apiRequestInfoCollection} from "../db/MongoDB";
import {injectable} from "inversify";

@injectable()
export class ApiRequestInfoRepository {

    async addApiRequestInfo (ip: string | undefined, URL: string, date: Date): Promise<any> {
        await apiRequestInfoCollection.insertOne({ IP: ip, URL: URL, date: date });
        return
    }

    async findApiRequestInfo (ip: string | undefined, URL: string): Promise<any> {
        const requests = await apiRequestInfoCollection.find({IP: ip, URL: URL}).toArray()
        return requests.map(array => {
            return array.date
        })
    }

    async deleteApiRequestInfo (ip: string | undefined, URL: string, date: Date): Promise<any> {
        await apiRequestInfoCollection.deleteOne({IP: ip, URL: URL, date: date})
    }
}
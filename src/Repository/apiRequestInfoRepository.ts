import {apiRequestsInfoModel} from "../db/MongoDB";
import {injectable} from "inversify";
import {ApiRequestsInfoClass} from "../Types/Types";

@injectable()
export class ApiRequestInfoRepository {

    async addApiRequestsInfo (ip: string | undefined, URL: string, date: Date): Promise<void> {

        const newApiRequestsInfo: ApiRequestsInfoClass = new ApiRequestsInfoClass(ip, URL, date);
        await apiRequestsInfoModel.insertOne(newApiRequestsInfo);
        return
    }

    async findApiRequestsInfo (ip: string | undefined, URL: string): Promise<Date[]> {

        const requests = await apiRequestsInfoModel.find({IP: ip, URL: URL}).lean()
        return requests.map(array => {
            return array.date
        })
    }

    async deleteApiRequestsInfo (ip: string | undefined, URL: string, date: Date): Promise<void> {

        await apiRequestsInfoModel.deleteOne({IP: ip, URL: URL, date: date})
        return
    }
}
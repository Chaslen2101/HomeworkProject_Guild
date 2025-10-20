import {NextFunction, Request, Response} from "express";
import {httpStatuses} from "../../../settings";
import {differenceInMilliseconds, max, min} from "date-fns";
import {apiRequestsInfoRepository} from "../../../composition-root";


export const requestInfoCollector = async (req: Request, res: Response, next: NextFunction) => {

    const date = new Date();

    await apiRequestsInfoRepository.addApiRequestsInfo(req.ip, req.originalUrl, date)

    const numberOfRequests: Date[] = await apiRequestsInfoRepository.findApiRequestsInfo(req.ip, req.originalUrl)

    console.log("numberOfRequests: ", numberOfRequests)

    if (numberOfRequests.length > 5) {

        const earliestRequest = min(numberOfRequests)
        const latestRequest = max(numberOfRequests)
        const difference = differenceInMilliseconds(latestRequest, earliestRequest)

        console.log("earliestRequest: ", earliestRequest)
        console.log("latestRequest: ", latestRequest)
        console.log("difference: ", difference)
        console.log("newPatch")

        if (difference >= 10000) {
            await apiRequestsInfoRepository.deleteApiRequestsInfo(req.ip, req.originalUrl, earliestRequest)
            next()
        }else {
            res
                .status(httpStatuses.TOO_MANY_REQUEST_429)
                .json({})
            return
        }

    }else {
        next()
    }
}
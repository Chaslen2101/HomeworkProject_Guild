import {NextFunction, Request, Response} from "express";
import {apiRequestInfoRepository} from "../../Repository/apiRequestInfoRepository";
import {httpStatuses} from "../../settings";
import {differenceInMilliseconds, max, min} from "date-fns";


export const RequestInfoCollector = async (req: Request, res: Response, next: NextFunction) => {

    const date = new Date();

    await apiRequestInfoRepository.addApiRequestInfo(req.ip, req.originalUrl, date)

    const numberOfRequests = await apiRequestInfoRepository.findApiRequestInfo(req.ip, req.originalUrl)

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
            await apiRequestInfoRepository.deleteApiRequestInfo(req.ip, req.originalUrl, date)
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
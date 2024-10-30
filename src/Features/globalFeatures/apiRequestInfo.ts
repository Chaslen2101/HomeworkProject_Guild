import {NextFunction, Request, Response} from "express";
import {apiRequestInfoRepository} from "../../Repository/apiRequestInfoRepository";
import {httpStatuses} from "../../settings";
import {differenceInMilliseconds, max, min} from "date-fns";


export const RequestInfoCollector = async (req: Request, res: Response, next: NextFunction) => {

    const date = new Date();

    await apiRequestInfoRepository.addRequestInfo(req.ip, req.originalUrl, date)

    const numberOfRequests = await apiRequestInfoRepository.findRequestInfo(req.ip, req.originalUrl)

    if (numberOfRequests.length > 5) {

        const earliestRequest = min(numberOfRequests)
        const latestRequest = max(numberOfRequests)
        const difference = differenceInMilliseconds(earliestRequest, latestRequest)

        if (difference > 10000) {
            await apiRequestInfoRepository.deleteRequestInfo(req.ip, req.originalUrl, date)
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
import {NextFunction, Request, Response} from "express";
import {apiRequestInfoRepository} from "../../Repository/apiRequestInfoRepository";
import {httpStatuses} from "../../settings";


export const RequestInfoCollector = async (req: Request, res: Response, next: NextFunction) => {

    setTimeout( () => {
        apiRequestInfoRepository.deleteRequestInfo(req.ip, req.baseUrl)
    }, 10000)

    const numberOfRequests = await apiRequestInfoRepository.findRequestInfo(req.ip, req.baseUrl)

    if (numberOfRequests.length > 5) {
        res
            .status(httpStatuses.TOO_MANY_REQUEST_429)
            .json({})
        return
    }
    await apiRequestInfoRepository.addRequestInfo(req.ip, req.baseUrl, new Date())

    next()
}
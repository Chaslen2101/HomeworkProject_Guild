import {jwtService} from "./jwtService";
import {hashHelper} from "../Features/globalFeatures/helper";

export const authService = {

    async login(password: string, neededUser: any) {

        const isPasswordCorrect = await hashHelper.comparePassword(neededUser.password, password)
        if (isPasswordCorrect) {
            return await jwtService.createToken(neededUser)
        } else return false
    },
}
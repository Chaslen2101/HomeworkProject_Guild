import {SortDirection} from "mongodb";
import bcrypt from "bcrypt"
import {existUserType} from "./Types";

export const queryHelper = (query: {[key:string]: string | undefined }) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : undefined,
    }
}

export const hashNewPassword = async (password: string) => {

    const salt =  await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

export const mapUserData = (userData: any) => {
    return userData.map((user:existUserType) => {
        return {
            id: user.id,
            login: user.login,
            email: user.email,
            createdAt: user.createdAt
        }
    })
}

export const sanitizeUserQuery = (query: {[key:string]: string | undefined }) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        searchLoginTerm: query.searchNameTerm ? query.searchNameTerm : null,
        searchEmailTerm: query.searchNameTerm ? query.searchNameTerm : null
    }
}

export const comparePassword = async (hashedPassword: string, somePassword: string) => {
    return await bcrypt.compare(somePassword, hashedPassword)
}
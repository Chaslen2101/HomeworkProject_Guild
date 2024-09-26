import {SortDirection} from "mongodb";
import bcrypt from "bcrypt"

export const queryHelper = (query: { [key: string]: string | undefined }) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        searchNameTerm: query.searchNameTerm ? query.searchNameTerm : undefined,
    }
}

export const hashNewPassword = async (password: string) => {

    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)

}

export const mapUserData = (userData: any) => {
    return {
        id: userData.id,
        login: userData.login,
        email: userData.email,
        createdAt: userData.createdAt
    }
}

export const sanitizeUserQuery = (query: { [key: string]: string | undefined }) => {
    return {
        pageNumber: query.pageNumber ? +query.pageNumber : 1,
        pageSize: query.pageSize !== undefined ? +query.pageSize : 10,
        sortBy: query.sortBy ? query.sortBy : 'createdAt',
        sortDirection: query.sortDirection ? query.sortDirection as SortDirection : 'desc',
        searchLoginTerm: query.searchLoginTerm ? query.searchLoginTerm : null,
        searchEmailTerm: query.searchEmailTerm ? query.searchEmailTerm : null
    }
}

export const comparePassword = async (hashedPassword: string, somePassword: string) => {
    return await bcrypt.compare(somePassword, hashedPassword)
}
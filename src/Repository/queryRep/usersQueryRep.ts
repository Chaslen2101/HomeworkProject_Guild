import {userCollection} from "../../db/MongoDB";
import {mapUserData, sanitizeUserQuery} from "../../Features/helper";
import {inputQueryType, userQueryType} from "../../Features/Types";

export const usersQueryRep = {

    async findUserByLoginOrEmail (loginOrEmail: string) {
        return await userCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]}, {projection: {_id: 0}});
    },

    async findUserById (id: string) {
        const neededUser = await userCollection.findOne({id: id,},{projection: {_id: 0}})
        return mapUserData(neededUser)
    },

    async findMany (query: inputQueryType) {
        const sanitizedQuery: userQueryType = sanitizeUserQuery(query)
        const filter = sanitizedQuery.searchEmailTerm ? {email: {$regex: sanitizedQuery.searchEmailTerm, $options: "i"}}
            : sanitizedQuery.searchLoginTerm ? {login:{$regex: sanitizedQuery.searchLoginTerm, $options: "i"}} : {}
        const users = await userCollection.find(filter,{projection: {_id: 0,password: 0}})
            .sort(sanitizedQuery.sortBy, sanitizedQuery.sortDirection)
            .limit(sanitizedQuery.pageSize)
            .skip((sanitizedQuery.pageNumber - 1) * sanitizedQuery.pageSize)
            .toArray()
        const totalCount = await userCollection.countDocuments(filter)
        return {
            pagesCount: Math.ceil(totalCount / sanitizedQuery.pageSize),
            page: sanitizedQuery.pageNumber,
            pageSize: sanitizedQuery.pageSize,
            totalCount: totalCount,
            items: users
        }
    }
}
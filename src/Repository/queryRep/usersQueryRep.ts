import {userCollection} from "../../db/MongoDB";
import {existUserType, userQueryType, userViewType} from "../../Types/Types";
import {mapToView} from "../../Features/globalFeatures/helper";
import {WithId} from "mongodb";
import {exists} from "node:fs";


class UsersQueryRep {

    async findUserByLoginOrEmail (loginOrEmail: string) {
        return await userCollection.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]}, {projection: {_id: 0}});
    }

    async findUserById (id: string) {
        return mapToView.mapUser(await userCollection.findOne({id: id,},{projection: {_id: 0}}))
    }

    async findManyUsersByLoginOrEmail (sanitizedQuery: userQueryType) {
        let filter = {}
        if (sanitizedQuery.searchLoginTerm && sanitizedQuery.searchEmailTerm) {
            filter = {$or:[{email:{$regex: sanitizedQuery.searchEmailTerm, $options: "i"}},{login:{$regex: sanitizedQuery.searchLoginTerm, $options:"i"}}]}
        }else if (!sanitizedQuery.searchLoginTerm && sanitizedQuery.searchEmailTerm) {
            filter = {email:{$regex: sanitizedQuery.searchEmailTerm, $options: "i"}}
        }else if (!sanitizedQuery.searchEmailTerm && sanitizedQuery.searchLoginTerm) {
            filter = {login:{$regex: sanitizedQuery.searchLoginTerm, $options:"i"}}
        }

        const items = await userCollection.find(filter,{projection: {_id: 0}})
            .sort(sanitizedQuery.sortBy, sanitizedQuery.sortDirection)
            .limit(sanitizedQuery.pageSize)
            .skip((sanitizedQuery.pageNumber - 1) * sanitizedQuery.pageSize)
            .toArray() as WithId<existUserType>[]
        const totalCount = await userCollection.countDocuments(filter)
        const users: userViewType[] = mapToView.mapUsers(items)
        return {
            pagesCount: Math.ceil(totalCount / sanitizedQuery.pageSize),
            page: sanitizedQuery.pageNumber,
            pageSize: sanitizedQuery.pageSize,
            totalCount: totalCount,
            items: users
        }
    }

    async findUserByConfirmCode (code: string) {
        return userCollection.findOne({"emailConfirmationInfo.confirmationCode": code},{projection:{_id:0}})
    }
}

export const usersQueryRep = new UsersQueryRep()
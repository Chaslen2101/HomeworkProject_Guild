import {usersModel} from "../../db/MongoDB";
import {usersPagesType, UserClass, userQueryType, userViewType} from "../../Types/Types";
import {mapToView} from "../../Features/globalFeatures/helper";
import {WithId} from "mongodb";
import {injectable} from "inversify";


@injectable()
export class UsersQueryRep {

    async findUserByLoginOrEmail (loginOrEmail: string): Promise<UserClass | null> {

        return await usersModel.findOne({$or: [{login: loginOrEmail}, {email: loginOrEmail}]}, {projection: {_id: 0}});
    }

    async findUserById (id: string): Promise<userViewType | null> {

        return mapToView.mapUser(await usersModel.findOne({id: id,},{projection: {_id: 0}}))
    }

    async findManyUsersByLoginOrEmail (sanitizedQuery: userQueryType): Promise<usersPagesType | null> {

        let filter = {}
        if (sanitizedQuery.searchLoginTerm && sanitizedQuery.searchEmailTerm) {
            filter = {$or:[{email:{$regex: sanitizedQuery.searchEmailTerm, $options: "i"}},{login:{$regex: sanitizedQuery.searchLoginTerm, $options:"i"}}]}
        }else if (!sanitizedQuery.searchLoginTerm && sanitizedQuery.searchEmailTerm) {
            filter = {email:{$regex: sanitizedQuery.searchEmailTerm, $options: "i"}}
        }else if (!sanitizedQuery.searchEmailTerm && sanitizedQuery.searchLoginTerm) {
            filter = {login:{$regex: sanitizedQuery.searchLoginTerm, $options:"i"}}
        }

        const items: UserClass[] = await usersModel.find(filter,{projection: {_id: 0}})
            .sort({[sanitizedQuery.sortBy]: sanitizedQuery.sortDirection})
            .limit(sanitizedQuery.pageSize)
            .skip((sanitizedQuery.pageNumber - 1) * sanitizedQuery.pageSize)
            .lean() as WithId<UserClass>[]
        const totalCount: number = await usersModel.countDocuments(filter)
        const users: userViewType[] = mapToView.mapUsers(items)
        return {
            pagesCount: Math.ceil(totalCount / sanitizedQuery.pageSize),
            page: sanitizedQuery.pageNumber,
            pageSize: sanitizedQuery.pageSize,
            totalCount: totalCount,
            items: users
        }
    }

    async findUserByEmailConfirmCode (code: string): Promise<UserClass | null> {

        return usersModel.findOne({"emailConfirmationInfo.confirmationCode": code},{projection:{_id:0}})
    }

    async findUserByPasswordRecoveryCode (code: string): Promise<UserClass | null> {

        return usersModel.findOne({"passwordRecoveryCode.confirmationCode": code},{projection:{_id:0}})
    }
}


import {config} from 'dotenv'

config() // добавление переменных из файла .env в process.env


export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 5005,
    PATH: {
        VIDEOS: '/videos',
    },
    SECRET_ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY || "eqwqweqwe",
    SECRET_REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY || "asdasdasasd"
}

export const httpStatuses = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    NOT_FOUND_404: 404,
    FORBIDDEN_403: 403,
    TOO_MANY_REQUEST_429: 429,
}

export const mongoSettings = {
    dbName : "guild-dev",
    blogCollectionName : "blogs",
    postCollectionName : "posts",
    userCollectionName : "users",
    commentCollectionName: "comment",
    refreshTokenBlackListName: "refreshTokenBlackList",
    apiRequestInfoCollectionName: "apiRequestInfo",
    sessionsCollectionName: "sessions",
}

export const ADMIN_AUTH = "admin:qwerty"

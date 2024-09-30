import {config} from 'dotenv'

config() // добавление переменных из файла .env в process.env


export const SETTINGS = {
    // все хардкодные значения должны быть здесь, для удобства их изменения
    PORT: process.env.PORT || 5005,
    PATH: {
        VIDEOS: '/videos',
    },
    SECRET_KEY: process.env.KEY || "eqwqweqwe"
}

export const httpStatuses = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    NOT_FOUND_404: 404,
    FORBIDDEN_403: 403
}

export const mongoSettings = {
    dbName : "guild-dev",
    blogCollectionName : "blogs",
    postCollectionName : "posts",
    userCollectionName : "users",
    commentCollectionName: "comment"
}

export const ADMIN_AUTH = "admin:qwerty"

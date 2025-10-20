import {body} from "express-validator";

export const commentInputValidator = () => {
        return [
        body("content").trim().isString().withMessage("comment should be string")
            .isLength({min:20, max:300}).withMessage("comment length should be from 20 to 300")
    ]
}

export const likeStatusValidator = () => {
    return [
        body("likeStatus").exists().withMessage("like status is required").isIn(["None", "Like", "Dislike"]).withMessage("Invalid like status"),
    ]
}
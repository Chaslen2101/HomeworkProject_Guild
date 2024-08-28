import {body} from "express-validator"


export const inputBlogsValidation = () => {
    return [
        body('name').exists().withMessage("Name is required")
            .isString().withMessage("Name should be string").trim()
            .isLength({min: 1, max: 15}).withMessage("Length should be from 1 to 15"),
        body("description").exists().withMessage("description is required")
            .isString().withMessage("description should be string")
            .trim().isLength({min: 1, max: 500}).withMessage("Length should be from 1 to 500"),
        body("websiteUrl").trim()
            .exists().withMessage("websiteUrl is required")
            .isURL().withMessage("Input real URL")
            .isString().withMessage("URL should be string")
            .matches(/^https:\/\/([a-zA-Z0-9_-]+\.)+[a-zA-Z0-9_-]+(\/[a-zA-Z0-9_-]+)*\/?$/).withMessage("URL should match the specified pattern")
    ];
};

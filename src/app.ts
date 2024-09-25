import {Response, Request} from "express"
import express from "express"
import cors from "cors"
import {httpStatuses} from "./settings";
import {blogRouter} from "./Routers/blogsRouter";
import {deleteAllRouter} from "./Routers/deleteDataRouter";
import {postsRouter} from "./Routers/postsRouter";
import {authRouter} from "./Routers/authRouter";
import {usersRouter} from "./Routers/usersRouter";

export const app = express()
app.use(cors())
app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res
        .status(httpStatuses.OK_200)
        .send("Current version: 05_02")
})
app.use("/testing/all-data", deleteAllRouter)
app.use("/blogs", blogRouter)
app.use("/posts", postsRouter)
app.use("/auth", authRouter)
app.use("/users", usersRouter)


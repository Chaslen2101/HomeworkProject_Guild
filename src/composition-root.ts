import {UsersRepository} from "./Repository/usersRepository";
import {UsersService} from "./Services/usersServices";
import {SessionsRepository} from "./Repository/sessionsRepository";
import {SessionsService} from "./Services/sessionsService";
import {SessionsQueryRep} from "./Repository/queryRep/sessionsQueryRep";
import {UsersQueryRep} from "./Repository/queryRep/usersQueryRep";
import {PostsRepository} from "./Repository/postsRepository";
import {PostsService} from "./Services/postsServices";
import {CommentsRepository} from "./Repository/commentsRepository";
import {CommentsService} from "./Services/commentsService";
import {BlogsRepository} from "./Repository/blogsRepository";
import {BlogService} from "./Services/blogsServices";
import {AuthService} from "./Services/authService";
import {TokenBlackListRepository} from "./Repository/tokenBlackListRepository";
import {UsersController} from "./Controllers/usersController";
import {SessionsController} from "./Controllers/sessionsController";
import {BlogsQueryRep} from "./Repository/queryRep/blogsQueryRep";
import {PostsQueryRep} from "./Repository/queryRep/postsQueryRep";
import {PostsController} from "./Controllers/postsController";
import {CommentsQueryRep} from "./Repository/queryRep/commentsQueryRep";
import {CommentsController} from "./Controllers/commentsController";
import {BlogsController} from "./Controllers/blogsController";
import {AuthController} from "./Controllers/authController";
import {Container} from "inversify";
import {UsersValidator} from "./Features/validators/usersValidator";
import {AuthorizationCheck} from "./Features/globalFeatures/authorizationCheck";
import {PostsValidator} from "./Features/validators/postsValidator";
import {ApiRequestInfoRepository} from "./Repository/apiRequestInfoRepository";

// export const usersRepository: UsersRepository = new UsersRepository()
// export const usersQueryRep = new UsersQueryRep()
// export const sessionsRepository: SessionsRepository = new SessionsRepository()
// export const sessionsQueryRep = new SessionsQueryRep()
// export const postsRepository = new PostsRepository()
// export const postsQueryRep = new PostsQueryRep();
// export const commentsRepository = new CommentsRepository()
// export const commentsQueryRep = new CommentsQueryRep();
// export const blogsRepository = new BlogsRepository()
// export const blogsQueryRep = new BlogsQueryRep();
// export const tokenBlackListRepository = new TokenBlackListRepository();
//
// export const usersService: UsersService = new UsersService(usersRepository)
// export const sessionsService: SessionsService = new SessionsService(sessionsRepository,sessionsQueryRep)
// export const postsService = new PostsService(postsRepository)
// export const commentsService = new CommentsService(commentsRepository)
// export const blogsService = new BlogService(blogsRepository)
// export const authService = new AuthService(usersRepository,usersQueryRep,sessionsRepository,tokenBlackListRepository)
//
// export const usersController = new UsersController(usersQueryRep,usersService)
// export const sessionsController = new SessionsController(sessionsQueryRep,sessionsService)
// export const postsController = new PostsController(postsQueryRep,blogsQueryRep,postsService)
// export const commentsController = new CommentsController(postsQueryRep,commentsQueryRep,commentsService)
// export const blogsController = new BlogsController(blogsQueryRep,postsQueryRep,blogsService,postsService)
// export const authController = new AuthController(usersQueryRep,authService)

export const container = new Container();

container.bind(UsersValidator).to(UsersValidator)
container.bind(AuthorizationCheck).to(AuthorizationCheck)
container.bind(PostsValidator).to(PostsValidator)

container.bind(UsersRepository).to(UsersRepository)
container.bind(UsersQueryRep).to(UsersQueryRep)
container.bind(SessionsRepository).to(SessionsRepository)
container.bind(SessionsQueryRep).to(SessionsQueryRep)
container.bind(PostsRepository).to(PostsRepository)
container.bind(PostsQueryRep).to(PostsQueryRep)
container.bind(CommentsRepository).to(CommentsRepository)
container.bind(CommentsQueryRep).to(CommentsQueryRep)
container.bind(BlogsRepository).to(BlogsRepository)
container.bind(BlogsQueryRep).to(BlogsQueryRep)
container.bind(TokenBlackListRepository).to(TokenBlackListRepository)
container.bind(ApiRequestInfoRepository).to(ApiRequestInfoRepository)

container.bind(UsersService).to(UsersService)
container.bind(SessionsService).to(SessionsService)
container.bind(PostsService).to(PostsService)
container.bind(CommentsService).to(CommentsService)
container.bind(BlogService).to(BlogService)
container.bind(AuthService).to(AuthService)

container.bind(UsersController).to(UsersController)
container.bind(SessionsController).to(SessionsController)
container.bind(PostsController).to(PostsController)
container.bind(CommentsController).to(CommentsController)
container.bind(BlogsController).to(BlogsController)
container.bind(AuthController).to(AuthController)

export const usersController:UsersController = container.get(UsersController)
export const sessionsController:SessionsController = container.get(SessionsController)
export const postsController:PostsController = container.get(PostsController)
export const commentsController:CommentsController = container.get(CommentsController)
export const blogsController:BlogsController = container.get(BlogsController)
export const authController:AuthController = container.get(AuthController)

export const usersValidator: UsersValidator = container.get(UsersValidator)
export const authorizationCheck: AuthorizationCheck = container.get(AuthorizationCheck)
export const postsValidator: PostsValidator = container.get(PostsValidator)
export const apiRequestsInfoRepository: ApiRequestInfoRepository = container.get(ApiRequestInfoRepository)
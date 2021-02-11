const { Router } = require("express");
const usersRouter = Router();
const tokenMiddleware = require("../middleware/middleware.users");

const { registrationRequest, loginRequest, logoutRequest, currentUserRequest } = require("./controller.users");

const { validateSignIn } = require("./validation.users");

usersRouter.get('/current', tokenMiddleware, currentUserRequest);
usersRouter.post('/auth/register', validateSignIn, registrationRequest);
usersRouter.post('/auth/login', validateSignIn, loginRequest);
usersRouter.post('/auth/logout', tokenMiddleware, logoutRequest);

module.exports = usersRouter;
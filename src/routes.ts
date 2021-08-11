import { Router } from "express";
import { CreateUserController } from "./controller/CreateUsersController";
import { CreateTagController } from "./controller/CreateTagController";
import { ensureAdmin } from "./middlewares/ensureAdmin";
import { ensureAuthenticated } from "./middlewares/ensureAuthenticated";
import { AuthenticateUserController } from "./controller/AuthenticateUserController";
import { CreateComplimentController } from "./controller/CreateComplimentController";
import { ListUserSendComplimentsController } from "./controller/ListUserSendComplimentsController";
import { ListUserReceiverComplimentsController } from "./controller/ListUserReceiverComplimentsController";
import { ListTagController } from "./controller/ListTagController";
import { ListUserController } from "./controller/ListUserController";

const router = Router();

const createUserController = new CreateUserController();
const createTagController = new CreateTagController();
const createComplimentController = new CreateComplimentController();
const authenticateUserController = new AuthenticateUserController();
const listUserSendComplimentsController =
  new ListUserSendComplimentsController();
const listUserReceiverComplimentsController =
  new ListUserReceiverComplimentsController();
const listTagController = new ListTagController();
const listUserController = new ListUserController();

router.post("/users", createUserController.handle);
router.post(
  "/tags",
  ensureAuthenticated,
  ensureAdmin,
  createTagController.handle
);
router.post("/login", authenticateUserController.handle);
router.post(
  "/compliment",
  ensureAuthenticated,
  createComplimentController.handle
);

router.get("/users/compliments/send", listUserSendComplimentsController.handle);
router.get(
  "/users/compliments/receive",
  listUserReceiverComplimentsController.handle
);
router.get("/tags", ensureAuthenticated, listTagController.handle);
router.get("/users", ensureAuthenticated, listUserController.handle);

export { router };

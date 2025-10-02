import { UserController } from './controller/user.controller.js';
import { UserService } from './service/user.service.js';
import { UserRepository } from './repository/user.repository.js';
export const userRepo = new UserRepository();
export const userService = new UserService(userRepo);
export const userController = new UserController(userService);

import { Router } from "express";
const router = Router();

import { getUsers, createUser, getUserById, updateUser, deleteUser } from "../Controllers/UserController.js";

router.route("/users")
	.get(getUsers)
	.post(createUser);

router.route("/users/:id")
	.get(getUserById)
	.put(updateUser)
	.delete(deleteUser);

export { router };
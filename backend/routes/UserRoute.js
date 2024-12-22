import express from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  upload,
} from "../controllers/UserController.js";

const router = express.Router();

router.get("/users", getUsers);
router.get("/users/:id", getUserById);
router.post("/users", upload.single("picture"), createUser);
router.patch("/users/:id", upload.single("picture"), updateUser);
router.delete("/users/:id", deleteUser);

export default router;

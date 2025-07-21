import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { login, register } from "../controllers/authController.js";

const router = express.Router();

router.post("/auth/login", login);
router.post("/auth/register", register);

router.use(authMiddleware);
router.get("/me", authMiddleware, async (req, res) => {
  const user = req.user;

  res.status(200).json({ message: "Informações do usuário autenticado no momento", user });
});


export default router;
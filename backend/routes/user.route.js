import express from "express";
import { signup, signin, logout } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { User } from "../model/User.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/logout", authMiddleware, logout);
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    res.json({ user });
  } catch (error) {
    console.error("Error fetching user", error);
    res.status(500).json({ message: "internal server error" });
  }
});

export default router;
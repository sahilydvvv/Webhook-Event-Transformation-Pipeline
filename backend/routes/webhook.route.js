import express from "express";
import { webhook_github } from "../controller/webhook.controller.js";


const router = express.Router();

router.post('/github', webhook_github);


export default router;
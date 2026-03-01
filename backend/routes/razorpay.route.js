import express from "express";
import { razorpay_webhook } from "../controller/razorpay.controller.js";

const router = express.Router();

router.post('/', razorpay_webhook);

export default router;
import express from 'express';
const router = express.Router();
import { getAllEvents } from '../controller/getEvents.controller.js';

router.get('/', getAllEvents);

export default router;
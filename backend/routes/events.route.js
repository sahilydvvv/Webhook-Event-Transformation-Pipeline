import express from 'express';
const router = express.Router();
import { getAllEvents } from '../controller/getEvents.controller.js';
import { getEventsBySource } from '../controller/getEvents.controller.js';

router.get('/', getAllEvents);

router.get('/source', getEventsBySource);

export default router;
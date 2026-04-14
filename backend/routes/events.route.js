import express from 'express';
const router = express.Router();
import { getAllEvents, getEventsBySource } from '../controller/getEvents.controller.js';
import { createManualEvent } from '../controller/createEvent.controller.js';

router.get('/', getAllEvents);
router.get('/source', getEventsBySource);
router.post('/', createManualEvent);

export default router;
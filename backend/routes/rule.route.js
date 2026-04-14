import express from 'express';
import { createRule, getRules, deleteRule } from '../controller/rule.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/', authMiddleware, createRule);
router.get('/', authMiddleware, getRules);
router.delete('/:id', authMiddleware, deleteRule);

export default router;

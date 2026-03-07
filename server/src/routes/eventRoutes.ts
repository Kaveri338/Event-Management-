import express from 'express';
import { createEvent, getEvents, registerForEvent } from '../controllers/eventController';
import { verifyToken } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', verifyToken, createEvent);
router.get('/', getEvents);
router.post('/:id/register', verifyToken, registerForEvent);

export default router;

import express from 'express';
import { createOrder, verifyOrderId } from '../controllers/rzpController.js';

const router = express.Router();

router.post('/create-order', createOrder);
router.post('/verify-order', verifyOrderId);

export default router;

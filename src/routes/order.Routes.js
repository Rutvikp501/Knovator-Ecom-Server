import express from 'express';
const router = express.Router();
import { placeOrder, getAllOrders, getOrdersByEmail } from '../controllers/order.Controller.js';

router.post('/', placeOrder);
router.get('/all', getAllOrders); 
router.get('/user/:email', getOrdersByEmail);

export default router;
import express from 'express';
const router = express.Router();

import orderRoutes from './order.Routes.js';
import productRoutes from './product.Routes.js';

router.use('/products', productRoutes);
router.use('/orders', orderRoutes);

// ✅ Basic check route (after API)
router.get('/', (req, res) => {
  res.send('Main Route is working ✅');
});

export default router;

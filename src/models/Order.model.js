import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  orderId: { type: Number, required: true, unique: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
  },
  products: [
    {
      productId: { type: String, required: true },
      name: { type: String, required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['Pending', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending' },
  deliveryLocations: [    {      address: { type: String, required: true },    }  ],
  orderDate: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);
export default Order;

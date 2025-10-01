import { SendOrderDetails } from "../config/sendEmail.js";
import Order from "../models/Order.model.js";
import User from "../models/User.model.js";
import { validateOrderData } from "../validators/order.Validator.js";

const orders = [];
let orderIdCounter = 1;
export const placeOrder = async (req, res, next) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      cartItems,
      totalAmount,
    } = req.body;

    const validation = validateOrderData(req.body);
    if (!validation.isValid) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validation.errors,
      });
    }
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      const newUser = await User.create({
        name: firstName + " " + lastName,
        email,
        phone,
        address,
      });
    }
    const previousOrder = await Order.findOne().sort({ orderId: -1 });
    const orderId = previousOrder ? previousOrder.orderId + 1 : 1;
    
    const order = {
      orderId: orderId,
      customer: {
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        address: address.trim(),
      },
      items: cartItems,
      totalAmount,
      orderDate: new Date().toISOString(),
      status: "Pending",
    };

    const newOrder = await Order.create({
      orderId: orderId,
      user: {
        name: firstName + " " + lastName,
        email: email,
        phone: phone,
      },
      products: cartItems.map((item) => ({
        productId: item.id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      totalAmount: totalAmount,
      deliveryLocations: [
        {
          address: address,
        },
      ],
      orderDate: new Date(),
    });
    // Store order (in-memory)
    orders.push(order);

    // Log order details to console (as per requirements)
    console.log("\n========== NEW ORDER PLACED ==========");
    console.log(`Order ID: ${order.orderId}`);
    console.log(
      `Customer: ${order.customer.firstName} ${order.customer.lastName}`
    );
    console.log(`Address: ${order.customer.address}`);
    console.log(`Total Amount: ₹${order.totalAmount}`);
    console.log(`Items (${order.items.length}):`);
    order.items.forEach((item) => {
      console.log(
        `  - ${item.name} x${item.quantity} = ₹${item.price * item.quantity}`
      );
    });
    console.log(`Order Date: ${order.orderDate}`);
    console.log("======================================\n");
    await SendOrderDetails(email, order);
    // Send success response
    res.status(201).json({
      success: true,
      message: "Order placed successfully!",
      data: {
        orderId: order.orderId,
        estimatedDelivery: "3-5 business days",
        orderDate: order.orderDate,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find();
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    next(error);
  }
};

export const getOrdersByEmail = async (req, res, next) => {
  try {
    const email = req.query.email || req.body.email || req.params.email;
    const orders = await Order.find({ "user.email": email });
    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found for this email"
      });
    }
    const { user } = orders[0];
    const userOrders  = orders.map(order => ({
      orderId: order.orderId,
      products: order.products,
      totalAmount: order.totalAmount,
      status: order.status,
      deliveryLocations: order.deliveryLocations,
      orderDate: order.orderDate
    }));

    const orderData = {
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone
      },
      orders: userOrders 
    };

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orderData
    });
  } catch (error) {
    next(error);
  }
};


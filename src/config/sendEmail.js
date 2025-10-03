import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const SendOrderDetails = async (to, order) => {
  console.log(process.env.MAIL_USER, process.env.MAIL_PASS);
  
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const itemsHtml = order.items.map(item => `
    <li>${item.name} x${item.quantity} = ₹${item.price * item.quantity}</li>
  `).join('');

  const htmlContent = `
    <div style="font-family: Arial, sans-serif; line-height: 1.6;">
      <h2>New Order Placed!</h2>
      <p><strong>Order ID:</strong> ${order.orderId}</p>
      <p><strong>Customer:</strong> ${order.customer.firstName} ${order.customer.lastName}</p>
      <p><strong>Address:</strong> ${order.customer.address}</p>
      <p><strong>Total Amount:</strong> ₹${order.totalAmount}</p>
      <p><strong>Items:</strong></p>
      <ul>${itemsHtml}</ul>
      <p><strong>Order Date:</strong> ${new Date(order.orderDate).toLocaleString()}</p>
    </div>
  `;

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: to,
    subject: `Order Confirmation - Order #${order.orderId}`,
    html: htmlContent,
  };
  console.log(mailOptions);

  const info = await transporter.sendMail(mailOptions);
  console.log(info);
  
  return info;
};

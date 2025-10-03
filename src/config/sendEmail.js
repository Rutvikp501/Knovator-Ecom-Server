import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const SendOrderDetails = async (to, order) => {
  
  const transporter = nodemailer.createTransport({
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
        tls: { rejectUnauthorized: false },
        debug: true
    });
  await transporter.verify().then(() => {
    console.log('Server is ready to take our messages');
  }).catch((err) => {
    console.error('Error with email server configuration:', err);
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

  const info = await transporter.sendMail(mailOptions);
  
  return info;
};

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

export const SendOrderDetails = async (to, order) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  // Build order items HTML
  const itemsHtml = order.items.map(item => `
    <li>${item.name} x${item.quantity} = ₹${item.price * item.quantity}</li>
  `).join('');

  // Build email HTML content similar to log
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

export const SendOTP = async (to, otp) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: to,
    subject : `Password Reset OTP`,
    html: `
        <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"></a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>You are receiving this because you (or someone else) have requested the reset of the password for your account. OTP is valid for 5 minutes</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />Rutvik Patil
    <br />patilrutvik501@gmail.com</p>
    <hr style="border:none;border-top:1px solid #eee" />
    
  </div>
</div>
        `,
  };

    const info = await transporter.sendMail(mailOptions);
    // console.log(info)
    return info;
};
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendAppointmentEmail = async ({ to, name, doctor, date, time }) => {
  const mailOptions = {
    from: `"Health Assistant" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Appointment Confirmation",
    html: `
      <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e0e0e0; border-radius: 12px; background-color: #ffffff; color: #333;">
        <h2 style="color: #2c3e50; text-align: center; margin-bottom: 25px;">Appointment Confirmed</h2>
        <p style="font-size: 16px;">Hello <strong>${name}</strong>,</p>
        <p style="font-size: 16px;">Your appointment has been successfully booked.</p>
        <ul>
          <li><strong>Doctor:</strong> ${doctor}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time} PM</li>
        </ul>
        <p style="font-size: 16px;">Thank you for choosing us.</p>
      </div>
    `
  };

  await transporter.sendMail(mailOptions);
};

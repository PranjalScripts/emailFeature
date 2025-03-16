const nodemailer = require("nodemailer");
const sendGridTransport = require("nodemailer-sendgrid-transport");
// Transporter Setup
const transporter = nodemailer.createTransport(
  sendGridTransport({
    auth: {
      api_key: process.env.API_SENDGRID, // Ensure API key is set correctly
    },
  })
);
const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    // Validation
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    // Email content
    const mailOptions = {
      to: "pranjalt363@gmail.com", // You receive the email here
      from: "pranjalt363@gmail.com", // Must be a verified sender in SendGrid
      subject: "New Message from Portfolio",
      html: `
        <h5>User Details</h5>
        <ul>
          <li><p><strong>Name:</strong> ${name}</p></li>
          <li><p><strong>Email:</strong> ${email}</p></li>
          <li><p><strong>Message:</strong> ${msg}</p></li>
        </ul>
      `,
    };
    // Send email and wait for response
    await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully!");
    return res.status(200).send({
      success: true,
      message: "Your Message Sent Successfully",
    });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    return res.status(500).send({
      success: false,
      message: "Failed to send email",
      error: error.message || error,
    });
  }
};
module.exports = { sendEmailController };

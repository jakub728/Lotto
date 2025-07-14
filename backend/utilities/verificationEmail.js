import { createTransport } from 'nodemailer';

// Use your own email and app password (e.g., for Gmail: enable 2FA and use app password)
const transporter = createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
});



/**
 * Sends a verification email to the user
 * @param {string} to - recipient email
 * @param {string} verificationLink - full URL with token
 */
const sendVerificationEmail = async (to, verificationLink) => {
  const mailOptions = {
    from: `"LOTTO APP" <${process.env.EMAIL_USER}>`,
    to: to,
    subject: 'Verify your email address',
    html: `
      <h2>Welcome to LOTTO APP!</h2>
      <p>Click the link below to verify your email address:</p>
      <a href="${verificationLink}" target="_blank" style="padding:10px 15px;background-color:#4CAF50;color:white;text-decoration:none;border-radius:5px;">
        Verify Email
      </a>
      <p>If you didn’t request this, just ignore this email.</p>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Verification email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export default sendVerificationEmail;

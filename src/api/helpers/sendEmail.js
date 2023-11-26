// sendEmail.js

import nodemailer from 'nodemailer';
import { google } from 'googleapis';

// Function to create a nodemailer transporter with OAuth2
const createTransporter = async () => {
  const oauth2Client = new google.auth.OAuth2(
    'YOUR_CLIENT_ID',
    'YOUR_CLIENT_SECRET',
    'YOUR_REDIRECT_URL'
  );

  // Set the refresh token
  oauth2Client.setCredentials({
    refresh_token: 'YOUR_REFRESH_TOKEN',
  });

  const accessToken = await oauth2Client.getAccessToken();

  // Create nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      type: 'OAuth2',
      user: 'ala.arfaoui751@gmail.com',
      clientId: 'YOUR_CLIENT_ID',
      clientSecret: 'YOUR_CLIENT_SECRET',
      refreshToken: 'YOUR_REFRESH_TOKEN',
      accessToken,
    },
  });

  return transporter;
};

// Function to send an email using the provided transporter
const sendEmail = async (transporter, to, subject, message) => {
  const mailOptions = {
    from: 'your-email@gmail.com',
    to,
    subject,
    text: message,
  };

  try {
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return info;
  } catch (error) {
    throw new Error(`Error sending email: ${error.message}`);
  }
};

// Export the functions for use elsewhere
export { createTransporter, sendEmail };

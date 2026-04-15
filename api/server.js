const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));
app.use(express.json());

const EMAIL_USER = process.env.EMAIL_USER || process.env.USER_EMAIL;
const EMAIL_PASS = process.env.EMAIL_PASS || process.env.USER_PASS;
const RECEIVER_EMAIL = process.env.RECEIVER_EMAIL || process.env.USER_EMAIL;

if (!EMAIL_USER || !EMAIL_PASS || !RECEIVER_EMAIL) {
  console.error('Missing email configuration. Set EMAIL_USER, EMAIL_PASS, and RECEIVER_EMAIL.');
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS
  }
});

app.get('/', (req, res) => {
  res.json({
    status: 'ok', message: 'Server is running.'
  });
});

app.post('/send-email', async (req, res) => {
  const { fname, lname, email, subject, message
  } = req.body;

  if (!fname || !lname || !email || !message) {
    return res.status(400).json({
      success: false, error: 'Missing required fields.'
    });
  }

  const mailOptions = {
    from: `"Portfolio Contact" <${EMAIL_USER}>`,
    to: RECEIVER_EMAIL,
    replyTo: email,
    subject: `[Portfolio] New message from ${fname} ${lname}`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#07080c;color:#eef2f7;padding:40px;border-radius:12px;border:1px solid rgba(255,255,255,0.08);">
        <div style="border-bottom:1px solid rgba(201,169,110,0.3);padding-bottom:24px;margin-bottom:28px;">
          <h2 style="margin:0;font-size:22px;color:#C9A96E;">New Contact Form Submission</h2>
          <p style="margin:6px 0 0;font-size:12px;color:rgba(238,242,247,0.4);letter-spacing:0.1em;">PORTFOLIO — dev&amp;design</p>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-bottom:28px;">
          <tr>
            <td style="padding:8px 0;color:rgba(238,242,247,0.45);font-size:12px;text-transform:uppercase;width:130px;">Name</td>
            <td style="padding:8px 0;font-size:15px;color:#eef2f7;">${fname
      } ${lname
      }</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:rgba(238,242,247,0.45);font-size:12px;text-transform:uppercase;">Email</td>
            <td style="padding:8px 0;font-size:15px;"><a href="mailto:${email}" style="color:#00cfff;text-decoration:none;">${email
      }</a></td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:rgba(238,242,247,0.45);font-size:12px;text-transform:uppercase;">Service</td>
            <td style="padding:8px 0;font-size:15px;color:#eef2f7;">${subject || 'Not specified'
      }</td>
          </tr>
        </table>
        <div style="background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);border-radius:8px;padding:20px;">
          <p style="margin:0 0 10px;font-size:11px;text-transform:uppercase;color:rgba(238,242,247,0.35);">Message</p>
          <p style="margin:0;font-size:14px;line-height:1.85;color:#eef2f7;white-space:pre-wrap;">${message
      }</p>
        </div>
        <p style="margin:28px 0 0;font-size:11px;color:rgba(238,242,247,0.25);text-align:center;">Sent from your portfolio contact form</p>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    res.json({
      success: true
    });
  } catch (err) {
    console.error("Email Error",err.message);
    res.status(500).json({
      success: false, error: 'Failed to send email.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;


const express = require('express');
const bodyParser = require('body-parser');
const OTPService = require('./service/otpService');

require('dotenv').config();
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());

const otpService = new OTPService();

app.post('/send-otp', async (req, res) => {
  const { phone, message, otp } = req.body;

  if (!phone || !otp || !message) {
    return res.status(400).json({ error: 'phone, message and otp are required' });
  }

  try {
    await otpService.sendOTP(phone, message, otp);
    res.json({ success: true, message: 'OTP sent successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => console.log(`Server is running`));

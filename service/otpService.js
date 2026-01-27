const WPPConnectProvider = require('../provider/wppConnectProvider');
const BaileysProvider = require('../provider/baileysProvider');

class OTPService {
  constructor() {
    this.primary = new WPPConnectProvider();
    this.fallback = new BaileysProvider();
  }

  async sendOTP(phone, message, otp) {

    try {
      await this.primary.sendMessage(phone, message, otp);
      console.log('OTP sent via WPPConnect');
    } catch (err) {
      console.warn('WPPConnect failed, using Baileys', err);
      try {
        await this.fallback.sendMessage(phone, message, otp);
        console.log('OTP sent via Baileys');
      } catch (err2) {
        console.error('Both providers failed', err2);
        throw new Error('Failed to send OTP');
      }
    }
  }
}

module.exports = OTPService;
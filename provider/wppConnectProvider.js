const WhatsAppProvider = require('./whatsappProvider');
const wppconnect = require('@wppconnect-team/wppconnect');

class WPPConnectProvider extends WhatsAppProvider {
  constructor() {
    super();

    this.clientPromise = wppconnect.create({
      session: 'otp-session',
      headless: true,
      autoClose: 0,
      puppeteerOptions: {
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-gpu'
        ]
      }
    }).then(client => {
      console.log('WPPConnect ready');
      return client;
    });
  }

  async sendMessage(phone, message, otp) {
    const client = await this.clientPromise;
    const chatId = phone.replace(/\D/g, '') + '@c.us';
    await client.sendText(chatId, message + otp);
  }
}

module.exports = WPPConnectProvider;
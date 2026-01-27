const WhatsAppProvider = require('./whatsappProvider');
const { default: makeWaSocket, useSingleFileAuthState, DisconnectReason } = require('@adiwajshing/baileys');
const path = require('path');

class BaileysProvider extends WhatsAppProvider {
  constructor() {
    super();
    this.clientPromise = this.init();
  }

  async init() {
    const { state, saveState } = useSingleFileAuthState(path.resolve('./baileys-auth.json'));
    const sock = makeWaSocket({
      auth: state,
      printQRInTerminal: true,
    });
    sock.ev.on('creds.update', saveState);
    sock.ev.on('connection.update', (update) => {
      if (update.connection === 'open') console.log('Baileys connected');
    });
    return sock;
  }

  async sendMessage(phone, message, otp) {
    const client = await this.clientPromise;
    await client.sendMessage(phone.replace(/\D/g, '') + '@s.whatsapp.net', { text: message+otp });
  }
}

module.exports = BaileysProvider;

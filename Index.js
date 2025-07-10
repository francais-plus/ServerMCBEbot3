const bedrock = require('bedrock-protocol');
const config = require('./config.json');

const client = bedrock.createClient({
  host: config.ip,
  port: config.port,
  username: config.name,
  offline: true
});

client.on('connect', () => console.log('✅ Bot terhubung!'));
client.on('spawn', () => console.log('🟢 Bot sudah spawn di dunia'));
client.on('text', packet => {
  console.log(`[CHAT] ${packet.source_name}: ${packet.message}`);
  if (packet.source_name !== client.username) {
    client.queue('text', {
      type: 'chat',
      needs_translation: false,
      source_name: client.username,
      xuid: '',
      platform_chat_id: '',
      filtered_message: '',
      message: `Halo, ${packet.source_name}`
    });
  }
});
client.on('disconnect', err => console.log('❌ Terputus:', err));
client.on('error', err => console.error('🚫 Error:', err));


const axios = require('axios');

async function getGPTResponse(sock, msg) {
    const texto = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const numero = msg.key.remoteJid;

    const response = await axios.post('https://api.openai.com/v1/completions', {
        prompt: texto,
        model: 'text-davinci-003',
        max_tokens: 150
    }, {
        headers: {
            'Authorization': `Bearer YOUR_OPENAI_API_KEY`
        }
    });

    const resposta = response.data.choices[0].text.trim();
    await sock.sendMessage(numero, { text: resposta });
}

module.exports = { getGPTResponse };

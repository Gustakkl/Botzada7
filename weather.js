
const axios = require('axios');

async function getWeather(sock, msg) {
    const texto = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const numero = msg.key.remoteJid;

    const city = texto.replace(/clima/i, '').trim();
    const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=YOUR_WEATHER_API_KEY&q=${city}`);

    const weather = response.data;
    const weatherMessage = `O tempo em ${city} é ${weather.current.condition.text}. A temperatura é de ${weather.current.temp_c}°C.`;

    await sock.sendMessage(numero, { text: weatherMessage });
}

module.exports = { getWeather };


const { getGPTResponse } = require('./chatgpt');
const { getWeather } = require('./weather');
const { getHoroscope } = require('./horoscope');
const { generateQR } = require('./qr');
const { generateSticker } = require('./sticker');
const { downloadYoutube } = require('./youtube');

async function handleMessage(sock, msg) {
    const texto = msg.message.conversation || msg.message.extendedTextMessage?.text || '';
    const numero = msg.key.remoteJid;

    if (/^(oi|menu|olá)$/i.test(texto)) {
        await sock.sendMessage(numero, { text: `Olá! Eu sou o Merlin, seu assistente 24h.
Escolha uma opção:
1 - Falar com atendente
2 - Quero um orçamento
3 - Gerar Figurinhas
4 - Baixar Vídeos
5 - Previsão do Tempo
6 - Horóscopo
7 - Curiosidades
8 - ChatGPT` });
    } else if (/1|atendente/i.test(texto)) {
        await sock.sendMessage(numero, { text: 'Um atendente estará com você em breve.' });
    } else if (/2|orçamento/i.test(texto)) {
        await sock.sendMessage(numero, { text: 'Envia os detalhes do seu pedido para um orçamento.' });
    } else if (/3|figurinhas/i.test(texto)) {
        await generateSticker(sock, msg);
    } else if (/4|baixar/i.test(texto)) {
        await downloadYoutube(sock, msg);
    } else if (/5|clima/i.test(texto)) {
        await getWeather(sock, msg);
    } else if (/6|horoscopo/i.test(texto)) {
        await getHoroscope(sock, msg);
    } else if (/7|curiosidade/i.test(texto)) {
        await sock.sendMessage(numero, { text: 'Sabia que o cérebro humano tem mais conexões do que o universo tem estrelas?' });
    } else if (/8|gpt/i.test(texto)) {
        await getGPTResponse(sock, msg);
    } else {
        await sock.sendMessage(numero, { text: 'Desculpe, não entendi. Envie "menu" para ver as opções.' });
    }
}

module.exports = { handleMessage };

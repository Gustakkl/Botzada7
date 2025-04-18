// whatsapp.js

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');

// Caminho para seu arquivo de configuração (config.json ou qualquer outro)
const config = JSON.parse(fs.readFileSync('config.json'));

// Inicializando o cliente do WhatsApp
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

// Gerar QR code para autenticação no WhatsApp
client.on('qr', (qr) => {
    qrcode.generate(qr, { small: true });
    console.log('QR code gerado, escaneie com seu WhatsApp!');
});

// Quando o WhatsApp estiver pronto
client.on('ready', () => {
    console.log('WhatsApp bot conectado!');
});

// Função para responder aos comandos
client.on('message', (message) => {
    const { body } = message;

    // Responder ao comando /menu com lista de comandos disponíveis
    if (body === '/menu') {
        message.reply(`
            Aqui estão seus comandos disponíveis:
            /gpt - IA inteligente
            /yt - Baixar do YouTube
            /fig - Criar figurinha
            /atendimento - Falar com atendente
        `);
    }

    // Responder ao comando /gpt com IA simulada
    if (body.startsWith('/gpt')) {
        message.reply('Estou funcionando perfeitamente! Em breve terei mais funcionalidades.');
    }

    // Comando para baixar vídeos do YouTube (ainda em desenvolvimento)
    if (body.startsWith('/yt')) {
        message.reply('Este comando será usado para baixar vídeos do YouTube (em desenvolvimento).');
    }

    // Comando para gerar figurinhas (em desenvolvimento)
    if (body.startsWith('/fig')) {
        message.reply('Este comando será usado para gerar figurinhas (em desenvolvimento).');
    }

    // Comando para interação com atendente
    if (body === '/atendimento') {
        message.reply('Você está agora conversando com um atendente virtual.');
    }
});

// Inicializando o cliente do WhatsApp
client.initialize();
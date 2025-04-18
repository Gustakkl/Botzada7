const readline = require('readline');
const fs = require('fs');

// Configuração do bot
const config = JSON.parse(fs.readFileSync('config.json'));

// Criando interface para interagir com o terminal
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Função que exibe o menu de comandos
function mostrarMenu() {
  console.log(`
  ╔══ ✦ ${config.botName} ✦ ══╗
  ║ Bem-vindo ao assistente mágico!
  ║ Prefixo: ${config.prefixo}
  ║ Dono: ${config.dono}  // Número do dono
  ║ Horário: ${config.horario}
  ╚═══════════════════╝

  Comandos principais:
  ${config.prefixo}gpt — IA inteligente
  ${config.prefixo}fig — Criar figurinha
  ${config.prefixo}yt — Baixar do YouTube
  ${config.prefixo}atendimento — Falar com atendente
  ${config.prefixo}menu — Ver todos os comandos
  `);
}

// Função para responder ao comando
function processarComando(comando) {
  switch(comando) {
    case `${config.prefixo}menu`:
      mostrarMenu();
      break;
    case `${config.prefixo}gpt`:
      console.log('Iniciando o GPT...');
      // Adicione a integração com o GPT aqui
      break;
    case `${config.prefixo}fig`:
      console.log('Criando figurinha...');
      // Adicione a funcionalidade de figurinhas aqui
      break;
    case `${config.prefixo}yt`:
      console.log('Baixando vídeo do YouTube...');
      // Adicione a funcionalidade de download do YouTube aqui
      break;
    case `${config.prefixo}atendimento`:
      console.log('Conectando com atendente...');
      // Adicione a funcionalidade de atendimento aqui
      break;
    default:
      console.log('Comando não reconhecido. Tente novamente.');
  }
}

// Função principal
function iniciarBot() {
  rl.question('Digite um comando: ', (comando) => {
    processarComando(comando);
    iniciarBot(); // Continua esperando novos comandos
  });
}

// Iniciar o bot
iniciarBot();
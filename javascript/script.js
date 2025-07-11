// script.js
document.addEventListener('DOMContentLoaded', function() {
    const meuInput = document.getElementById('meuInput');
    const container = document.querySelector('.container');
    const darkOverlay = document.getElementById('darkOverlay'); // Certifique-se que este ID existe no HTML

    let chatDisplay = document.getElementById('chatDisplay');
    let errorMessage = document.getElementById('errorMessage');
    let chatBackground = document.getElementById('chatBackground');

    
    if (!chatDisplay) {
        chatDisplay = document.createElement('div');
        chatDisplay.id = 'chatDisplay';
        container.appendChild(chatDisplay);
    }
    if (!errorMessage) {
        errorMessage = document.createElement('div');
        errorMessage.id = 'errorMessage';
        errorMessage.textContent = 'Comando desconhecido. Para ajuda, use /help';
        container.appendChild(errorMessage);
    }
    if (!chatBackground) {
        chatBackground = document.createElement('div');
        chatBackground.id = 'chatBackground';
        container.insertBefore(chatBackground, chatDisplay); // Inserir antes para o Z-index funcionar
    }
    // Se darkOverlay não existe (o que seria um erro no HTML), crie-o
    if (!darkOverlay) {
        console.error("Erro: #darkOverlay não encontrado no HTML. Criando um agora.");
        const newOverlay = document.createElement('div');
        newOverlay.id = 'darkOverlay';
        document.body.appendChild(newOverlay);
        darkOverlay = newOverlay;
    }


    // Garante que TODOS os elementos do chat e o overlay comecem escondidos ao carregar a página
    meuInput.style.display = 'none';
    chatDisplay.style.display = 'none';
    chatBackground.style.display = 'none';
    errorMessage.style.display = 'none';
    darkOverlay.style.display = 'none';


    document.addEventListener('keydown', function(event) {
        // Se a tecla for 't' ou 'T' E o input estiver escondido (chat inativo)
        if ((event.key === 't' || event.key === 'T') && meuInput.style.display === 'none') {
            meuInput.style.display = 'block';     // Mostra o input
            chatDisplay.style.display = 'block';   // Mostra a área de mensagens do chat
            chatBackground.style.display = 'block'; // Mostra o fundo opaco das mensagens
            darkOverlay.style.display = 'block';   // Mostra o overlay preto sobre a imagem
            meuInput.focus();                      // Coloca o foco no input
            event.preventDefault();                // Impede que a letra 't' apareça no input
        }
        // Se 'Escape' for pressionado E o input estiver visível (chat ativo)
        else if (event.key === 'Escape' && meuInput.style.display === 'block') {
            meuInput.value = '';                    // Limpa o input
            meuInput.style.display = 'none';        // Esconde o input
            chatDisplay.style.display = 'none';     // Esconde a área de mensagens
            chatBackground.style.display = 'none';  // Esconde o fundo das mensagens
            errorMessage.style.display = 'none';    // Esconde a mensagem de erro
            darkOverlay.style.display = 'none';     // Esconde o overlay preto
            event.preventDefault();                 // Impede o comportamento padrão do Escape
        }
    });

    // Função principal para processar o input ao apertar Enter
    function mostrarValor(event) {
        if (event.key === 'Enter') {
            const inputValue = meuInput.value.trim(); // Pega o texto do input
            meuInput.value = '';                         // Limpa o input

            // Lógica para comandos com barra (/)
            if (inputValue.startsWith('/')) {
                if (inputValue === '/gamemode1 @s') {
                    displayChatMessage('<span style="color: yellow;">[Sistema]</span> Comandos disponíveis: /gamemode2 @s, /gamemode1 @s');
                    errorMessage.style.display = 'none';
                    // ABRE O YOUTUBE AQUI SE QUISER QUE ESSE COMANDO FAÇA ISSO.
                    // window.open('http://youtube.com', '_blank'); 
                } else if (inputValue === '/gamemode2 @s') {
                    const codigo = '0082'; // Código da pizza que você me deu!
                    displayChatMessage(`<span style="color: aqua;">[Sistema]</span> O código de operador é: ${codigo}`);
                    errorMessage.style.display = 'none';
                }
                modo(inputValue);
            } else if (inputValue !== '') {
                // Mensagem normal
                displayChatMessage(`Você: ${inputValue}`);
                errorMessage.style.display = 'none';
            } else {
                // Input vazio
                errorMessage.style.display = 'none';
            }
            event.preventDefault(); // Impede o comportamento padrão do Enter
        }
    }

    // Anexa a função de processamento ao input
    meuInput.onkeydown = mostrarValor;

    // Função para adicionar mensagens ao chat
    function displayChatMessage(message) {
        const messageElement = document.createElement('p');
        messageElement.innerHTML = message;
        chatDisplay.appendChild(messageElement);

        // Limita o número de mensagens
        if (chatDisplay.children.length > 10) {
            chatDisplay.removeChild(chatDisplay.children[0]);
        }
        // Rola para ver a mensagem mais recente
        chatDisplay.scrollTop = chatDisplay.scrollHeight;
    }
});

function modo(mod) {
    var link = document.createElement('a');
    switch (mod) {
        case '/gamemode1 @s':
            enviar('index.html', true);
            break;
        case '/gamemode2 @s':
            enviar('creative.html', true);
            break;
        case '/hero':
            enviar('HERO.HTML', true);
            break;
        case '/404':
            enviar('ent404.html', true);
            break;
        case '/casa':
            enviar('casa.html', true);
            break;
        case '/help':
            comandosHelp();
            break;
        // 40 Links para sites populares com '/iniciais'
        case '/yt': // YouTube
            enviar('https://www.youtube.com/', false);
            break;
        case '/gg': // Google
            enviar('https://www.google.com/', false);
            break;
        case '/fb': // Facebook
            enviar('https://www.facebook.com/', false);
            break;
        case '/ig': // Instagram
            enviar('https://www.instagram.com/', false);
            break;
        case '/ml': // MercadoLivre
            enviar('https://www.mercadolivre.com.br/', false);
            break;
        case '/sp': // Shopee
            enviar('https://shopee.com.br/', false);
            break;
        case '/sh': // Shein
            enviar('https://br.shein.com/', false);
            break;
        case '/av': // Avon
            enviar('https://www.avon.com.br/', false);
            break;
        case '/nt': // Natura
            enviar('https://www.natura.com.br/', false);
            break;
        case '/am': // Amazon
            enviar('https://www.amazon.com.br/', false);
            break;
        case '/tw': // Twitter (X)
            enviar('https://twitter.com/', false);
            break;
        case '/wk': // Wikipedia
            enviar('https://pt.wikipedia.org/', false);
            break;
        case '/nf': // Netflix
            enviar('https://www.netflix.com/br/', false);
            break;
        case '/hb': // HBO Max
            enviar('https://www.max.com/br/pt/', false);
            break;
        case '/dp': // Disney+
            enviar('https://www.disneyplus.com/pt-br', false);
            break;
        case '/glob': // Globo.com
            enviar('https://www.globo.com/', false);
            break;
        case '/uol': // UOL
            enviar('https://www.uol.com.br/', false);
            break;
        case '/r7': // R7
            enviar('https://www.r7.com/', false);
            break;
        case '/g1': // G1
            enviar('https://g1.globo.com/', false);
            break;
        case '/tecm': // TecMundo
            enviar('https://www.tecmundo.com.br/', false);
            break;
        case '/olx': // OLX
            enviar('https://www.olx.com.br/', false);
            break;
        case '/ifd': // iFood
            enviar('https://www.ifood.com.br/', false);
            break;
        case '/99f': // 99Food
            enviar('https://99app.com/99food/', false);
            break;
        case '/ubr': // Uber
            enviar('https://www.uber.com/br/pt-br/', false);
            break;
        case '/lyft': // Lyft
            enviar('https://www.lyft.com/', false);
            break;
        case '/airb': // Airbnb
            enviar('https://www.airbnb.com.br/', false);
            break;
        case '/bkn': // Booking.com
            enviar('https://www.booking.com/', false);
            break;
        case '/trip': // TripAdvisor
            enviar('https://www.tripadvisor.com.br/', false);
            break;
        case '/mrs': // Microsoft
            enviar('https://www.microsoft.com/pt-br/', false);
            break;
        case '/apl': // Apple
            enviar('https://www.apple.com/br/', false);
            break;
        case '/wrd': // WordPress
            enviar('https://wordpress.com/pt-br/', false);
            break;
        case '/git': // GitHub
            enviar('https://github.com/', false);
            break;
        case '/lnk': // LinkedIn
            enviar('https://www.linkedin.com/', false);
            break;
        case '/rdt': // Reddit
            enviar('https://www.reddit.com/', false);
            break;
        case '/pins': // Pinterest
            enviar('https://br.pinterest.com/', false);
            break;
        case '/spo': // Spotify
            enviar('https://www.spotify.com/br/', false);
            break;
        case '/dee': // Deezer
            enviar('https://www.deezer.com/br/', false);
            break;
        case '/wiki': // WikiHow
            enviar('https://pt.wikihow.com/', false);
            break;
        case '/cbnk': // CNET
            enviar('https://www.cnet.com/', false);
            break;
        case '/eb': // eBay
            enviar('https://www.ebay.com/', false);
            break;
        default:
            var erro = document.getElementById('erro');
            var texto = `<span style="color: red;">[Erro]</span> ${mod} não é um comando válido, você não tem permissão para digitá-lo ou tente novamente.`;
            erro.innerHTML = texto;
            errorMessage.style.display = 'block'; 
            displayChatMessage(texto); 
            break;
    }
}

function comandosHelp(){
    var chat = document.getElementById('chatDisplay');
    var comandos = {
        '/gamemode1 @s':'survial',
        '/gamemode2 @s':'creative',
        '/casa':'casa',
        '/404': 'secret-404',
        '/hero':'secreto',
        '/yt': 'YouTube',
        '/gg': 'Google',
        '/fb': 'Facebook',
        '/ig': 'Instagram',
        '/ml': 'Mercado Livre',
        '/sp': 'Shopee',
        '/sh': 'Shein',
        '/av': 'Avon',
        '/nt': 'Natura',
        '/am': 'Amazon',
        '/tw': 'Twitter (X)',
        '/wk': 'Wikipedia',
        '/nf': 'Netflix',
        '/hb': 'HBO Max',
        '/dp': 'Disney+',
        '/glob': 'Globo.com',
        '/uol': 'UOL',
        '/r7': 'R7',
        '/g1': 'G1',
        '/tecm': 'TecMundo',
        '/olx': 'OLX',
        '/ifd': 'iFood',
        '/99f': '99Food',
        '/ubr': 'Uber',
        '/lyft': 'Lyft',
        '/airb': 'Airbnb',
        '/bkn': 'Booking.com',
        '/trip': 'TripAdvisor',
        '/mrs': 'Microsoft',
        '/apl': 'Apple',
        '/wrd': 'WordPress',
        '/git': 'GitHub',
        '/lnk': 'LinkedIn',
        '/rdt': 'Reddit',
        '/pins': 'Pinterest',
        '/spo': 'Spotify',
        '/dee': 'Deezer',
        '/wiki': 'WikiHow',
        '/cbnk': 'CNET',
        '/eb': 'eBay'
    };

    let lista = "Comandos disponíveis:\n\n";

    for (let comando in comandos) {
        lista += `${comando} = ${comandos[comando]}\n`;
    }

    chat.innerText = lista;
}

function enviar(url, tp){
    var link = document.createElement('a');
    var chat = document.getElementById('chatDisplay');

    var contador = 5;
    var contar = document.getElementById('contagem');

    const intervalo = setInterval(() => {
        contador--;
        if (contador > 1) {
            contar.innerHTML = contador;
        } else {
            clearInterval(intervalo);
            contar.innerHTML = 'Teleporte Realizado!';
        }
    }, 1000);

    chat.innerHTML = 'Você será redirecionado em 5 segundos';
    link.href = url;

    if(!tp){
        link.target = '_blank';
    }
    setTimeout(() => link.click(), 5000);
}

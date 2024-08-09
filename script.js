
const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const curtoBt = document.querySelector('.app__card-button--curto');
const longoBt = document.querySelector('.app__card-button--longo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const musicaFocoInput = document.querySelector('#alternar-musica');
const musica = new Audio('/sons/luna-rise-part-one.mp3');
const somDePause = new Audio('/sons/pause.mp3');
const somDePlay = new Audio('/sons/play.wav');
const somBeep = new Audio('sons/beep.mp3');
const startPauseBt = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const buttonImage = startPauseBt.querySelector('img');
const tempoNaTela = document.querySelector('#timer');

somDePlay.volume = 0.1;
somDePause.volume = 0.1;
musica.volume = 0.7;
musica.loop = true;

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;
let temporizadorEmExecucao = false;

function alterarContexto(contexto) {
    mostraTempo();
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagens/${contexto}.png`);
    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada?<br>
                <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar à superfície.<br>
                <strong class="app__title-strong">Faça uma pausa longa.</strong>`
        default:
            break;

    }
}

function alterarAtivo(elementosAtivos, elementoParaAtivar) {
    elementosAtivos.forEach(el => el.classList.remove('active'));
    elementoParaAtivar.classList.add('active');
}

musicaFocoInput.addEventListener('change', e => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

focoBt.addEventListener('click', (e) => {
    tempoDecorridoEmSegundos = 1500;
    alterarContexto('foco');
    alterarAtivo([curtoBt, longoBt], focoBt)
});

curtoBt.addEventListener('click', (e) => {
    tempoDecorridoEmSegundos = 300;
    alterarContexto('descanso-curto');
    alterarAtivo([focoBt, longoBt], curtoBt)
});

longoBt.addEventListener('click', (e) => {
    tempoDecorridoEmSegundos = 900;
    alterarContexto('descanso-longo');
    alterarAtivo([focoBt, curtoBt], longoBt)
});

function iniciar() {
    if (!temporizadorEmExecucao) {
        intervaloId = setInterval(contagemRegressiva, 1000);
        temporizadorEmExecucao = true;
    }
}

function pausar() {
    if (temporizadorEmExecucao) {
        clearInterval(intervaloId);
        temporizadorEmExecucao = false;
    }
}

const contagemRegressiva = () => {
    tempoDecorridoEmSegundos--;
    
    if (tempoDecorridoEmSegundos <= 0) {
        temporizadorEmExecucao = false;
        somBeep.play();
        clearInterval(intervaloId);
    }

    mostraTempo();
}

startPauseBt.addEventListener('click', () => {
    if (temporizadorEmExecucao) {
        somDePause.play();
        pausar();
        iniciarOuPausarBt.innerHTML = 'Começar'
        buttonImage.setAttribute('src', 'imagens/play_arrow.png');
    } else {
        iniciar();
        somDePlay.play();
        iniciarOuPausarBt.innerHTML = 'Pausar'
        buttonImage.setAttribute('src', 'imagens/pause.png');
    }
});

function mostraTempo() {
    const data = new Date(tempoDecorridoEmSegundos * 1000);

    const tempoFormatado = data.toLocaleString('pt-br', {
        minute: '2-digit',
        second: '2-digit'
    })

    tempoNaTela.innerHTML = `${tempoFormatado}`;
}

mostraTempo(tempoDecorridoEmSegundos);



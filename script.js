const html = document.querySelector('html');
const botaoFoco = document.querySelector('.app__card-button--foco');
const botaoCurto = document.querySelector('.app__card-button--curto');
const botaoLongo = document.querySelector('.app__card-button--longo');

botaoFoco.addEventListener('click', (e) => {
    html.setAttribute('data-contexto', 'foco');
});

botaoCurto.addEventListener('click', (e) => {
    html.setAttribute('data-contexto', 'descanso-curto');
});

botaoLongo.addEventListener('click', (e) => {
    html.setAttribute('data-contexto', 'descanso-longo');
});
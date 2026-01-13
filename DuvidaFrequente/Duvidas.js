const abas = document.querySelectorAll('.aba');
const conteudos = document.querySelectorAll('.conteudo-aba');

abas.forEach(aba => {
    aba.addEventListener('click', () => {
        abas.forEach(a => a.classList.remove('ativa'));
        conteudos.forEach(c => c.classList.remove('ativa'));

        aba.classList.add('ativa');
        const alvo = aba.getAttribute('data-aba');
        document.getElementById(alvo).classList.add('ativa');
    });
});

document.querySelectorAll('.pergunta').forEach(botao => {
    botao.addEventListener('click', () => {
        const resposta = botao.nextElementSibling;
        const seta = botao.querySelector('.seta');

        if (resposta.classList.contains('ativa')) {
            resposta.style.maxHeight = resposta.scrollHeight + "px";
            setTimeout(() => {
                resposta.style.maxHeight = "0px";
            }, 1);
            resposta.classList.remove('ativa');
            seta.classList.remove('girar');
        } else {
            resposta.classList.add('ativa');
            resposta.style.maxHeight = resposta.scrollHeight + "px";
            seta.classList.add('girar');
        }
    });
});
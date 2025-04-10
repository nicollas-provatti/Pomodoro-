const tempos = {
    btnPomodoro: 1500,
    btnDescansoCurto: 300,
    btnDescansoLongo: 900
};

const campoTemporizador = document.getElementById("temporizador");
const btnPomodoro = document.getElementById("btnPomodoro");
const btnDescansoCurto = document.getElementById("btnDescansoCurto");
const btnDescansoLongo = document.getElementById("btnDescansoLongo");
const btnComecar = document.getElementById("btnComecar");
const btnPausa = document.getElementById("btnPausar");

let intervalo, segundosContando;

function definirBotaoSelecionado(idSelecionado) {
    [btnPomodoro, btnDescansoCurto, btnDescansoLongo].forEach(botao => {
        botao.classList.toggle("btnSelecionado", botao.id === idSelecionado);
    });
}

function atualizarTemporizador(segundos) {
    const minutos = Math.floor(segundos / 60);
    const restoSegundos = segundos % 60;
    campoTemporizador.innerText = `${minutos}:${restoSegundos < 10 ? '0' : ''}${restoSegundos}`;
}

function configurarEventos() {
    [btnPomodoro, btnDescansoCurto, btnDescansoLongo].forEach(botao => {
        botao.addEventListener("click", () => {
            definirBotaoSelecionado(botao.id);
            segundosContando = tempos[botao.id];
            atualizarTemporizador(segundosContando);
        });
    });
}

function iniciarContagem() {
    segundosContando = tempos[document.querySelector(".btnSelecionado").id];

    intervalo = setInterval(() => {
        segundosContando--;
        atualizarTemporizador(segundosContando);
        if (segundosContando <= 0) clearInterval(intervalo);
    }, 1000);

    alternarBotoes(true);
}

function pausarContagem() {
    clearInterval(intervalo);
    alternarBotoes(false);
}

function alternarBotoes(rodando) {
    btnComecar.style.display = rodando ? "none" : "block";
    btnPausa.style.display = rodando ? "block" : "none";
}

btnComecar.addEventListener("click", iniciarContagem);
btnPausa.addEventListener("click", pausarContagem);

configurarEventos();

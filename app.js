let randomNumberList = [];
let numeroLimite = 10;
let numeroSecreto = randomNumber();
let tentativas = 1;

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do número secreto.");
    exibirTextoNaTela("p", "Escolha um número entre 1 e 10.");
}

exibirMensagemInicial()

function randomNumber() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeElementosLista = randomNumberList.length;
    if (quantidadeElementosLista == numeroLimite) {
        randomNumberList = [];
    }
    if (randomNumberList.includes(numeroEscolhido)) {
        return randomNumber();
    } else {
        randomNumberList.push(numeroEscolhido);
        console.log(randomNumberList)
        return numeroEscolhido;
    }
}

function verificarChute() {
    let chute = document.querySelector("input").value;
    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Você desobriu o número secreto com ${tentativas} ${palavraTentativa}.`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("h1", "Errou!");
            exibirTextoNaTela("p", "O número secreto é menor.");
        } else {
            exibirTextoNaTela("p", "O número secreto é maior.");
        }
    }
    tentativas ++;
    limparCampo();
}

function limparCampo() {
    chute = document.querySelector("input");
    chute.value = "";
}

function reiniciarJogo() {
    numeroSecreto = randomNumber();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true)
}
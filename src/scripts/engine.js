const emojis = [
  "🥰",
  "🥰",
  "😱",
  "😱",
  "🤑",
  "🤑",
  "😡",
  "😡",
  "🤯",
  "🤯",
  "😎",
  "😎",
  "👀",
  "👀",
  "😂",
  "😂",
];
let openCards = [];
let erros = document.getElementById("score");
let contadorErros = parseInt(erros.textContent);
let contadorAcertos = 0;
const historico = localStorage.getItem("historicoMemoria")
  ? JSON.parse(localStorage.getItem("historicoMemoria"))
  : [];

const buttonStart = document.querySelector(".start");
const buttonReset = document.querySelector(".reset");
const buttonHistorico = document.querySelector(".historico-button");
const historicoContainer = document.querySelector(".resultados");

function preencherHistorico() {
  const div = document.createElement("div");
  div.classList.add("historico-item");
  const rankingByScore = [...historico].sort((a, b) => b.escore - a.escore);
  const topScore = rankingByScore.slice(0, 5);
  div.innerHTML = topScore
    .map((item) => {
      return `
      <div class="historico-resultado">
        <p><strong>Score Final:</strong> ${item.escore} pontos</p>
        <p><strong>Tempo Restante:</strong> ${item.tempo} segundos </p>
        <p><strong>Erros:</strong> ${item.erros}</p>
        <p><strong>Data:</strong> ${item.data}</p>
      </div>
    `;
    })
    .join("");
  historicoContainer.appendChild(div);
}
preencherHistorico();

function limparHistorico() {
  const confirmacao = confirm("Tem certeza que deseja limpar o histórico?");
  if (!confirmacao) {
    return;
  }
  localStorage.removeItem("historicoMemoria");
  location.reload();
}

//variável de randomização dos emojis
let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));

//Função que armazena objeto de histórico de jogo
function armazenarHistorico(erros, tempo, escore) {
  const resultado = {
    erros: erros,
    tempo: tempo,
    escore: escore,
    data: new Date().toLocaleString(),
  };
  historico.push(resultado);
  localStorage.setItem("historicoMemoria", JSON.stringify(historico));
}

//Função de score final
function scoreFinal(erros, time) {
  const erroValue = Number(erros) * 5;
  const timeValue = Number(time) * 2;
  const score = 180 + timeValue - erroValue;
  console.log("Score, timevalue e errovalue =>", score, timeValue, erroValue);
  console.log("time e erro", time, erros);
  return score;
}

function jogar() {
  for (let i = 0; i < emojis.length; i++) {
    let box = document.createElement("div");
    box.className = "item";
    box.innerHTML = shuffleEmojis[i];
    box.onclick =
      handleClick; /*handleClick nome da função, poderia ser qualquer um, para dizer quee vai manusear com o click*/
    document.querySelector(".game").appendChild(box);
  }
}
function handleClick() {
  /* alert("Hello!") Testei com um alert*/
  /* a função vai manusear HANDLE com o CLICK clique duas variáveis */
  if (openCards.length < 2) {
    this.classList.add("boxOpen");
    openCards.push(this);
  }

  if (openCards.length == 2) {
    setTimeout(checkMatch, 300);
  }
}

function checkMatch() {
  if (openCards[0].innerHTML === openCards[1].innerHTML) {
    openCards[0].classList.add("boxMatch");
    openCards[1].classList.add("boxMatch");
    contadorAcertos++;
    playSound("hit4");
  } else {
    openCards[0].classList.remove("boxOpen");
    openCards[1].classList.remove("boxOpen");
    //incrementado um contador de erros
    contadorErros++;
    erros.textContent = contadorErros;
  }

  openCards =
    []; /*depois de executado as condições eu preciso limpar o meu vetor de manejo */

  //Criando uma condição que declara o fim do jogo
  if (document.querySelectorAll(".boxMatch").length === emojis.length) {
    let tempo = Number(document.getElementById("time").textContent);
    let finalScoreVitoria = scoreFinal(contadorErros, tempo);
    clearInterval(timer);
    alert(
      `🥳Você venceu, parabéns🥳! Clique em RESET GAME para jogar novamente! Sua pontuação final é: ${finalScoreVitoria}!!`,
    );
    armazenarHistorico(contadorErros, tempo, finalScoreVitoria);
    window.location.reload();
  }
}

let timeLeft = 30; // Tempo inicial em segundos
let timer; // Variável para armazenar o intervalo

function startCountdown() {
  jogar(); //Só abre as cartas quando clicar em iniciar
  clearInterval(timer); // Garante que não haja múltiplas contagens ao clicar várias vezes
  buttonStart.disabled = true;
  buttonReset.classList.add("show");
  timer = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--; // Decrementa o tempo
      document.getElementById("time").textContent = timeLeft; // Atualiza na tela
    } else {
      clearInterval(timer); // Para o contador quando chega a 0
      alert(
        `😭Tempo esgotado, você acerto ${contadorAcertos} pares e cometeu ${contadorErros} erros!`,
      );
      buttonStart.disabled = false;
      buttonReset.classList.remove("show");

      window.location.reload();
    }
  }, 1000); // Atualiza a cada 1 segundo
}

function playSound(audioName) {
  let audio = new Audio(`./src/audios/${audioName}.mp3`);
  audio.volume = 0.4;
  audio.play();
}
/* vou Incrementar número de erros e tempo para reload 💪😎 */

function openHistorico() {
  const historicoContainer = document.querySelector(".historico");
  historicoContainer.classList.toggle("open");
}

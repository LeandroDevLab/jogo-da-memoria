const emojis = ["🥰","🥰","😱","😱","🤑","🤑","😡","😡","🤯","🤯","😎","😎","👀","👀","😂","😂"];
let openCards = [];
let erros = document.getElementById("score");
let contadorErros = parseInt(erros.textContent);
let contadorAcertos = 0;

//variável de randomização dos emojis
let shuffleEmojis = emojis.sort(()=>(Math.random() > 0.5 ? 2 : -1));

function jogar(){ 
    for(let i=0; i < emojis.length; i++){
        let box = document.createElement("div");
        box.className = "item";
        box.innerHTML = shuffleEmojis[i];
        box.onclick = handleClick; /*handleClick nome da função, poderia ser qualquer um, para dizer quee vai manusear com o click*/ 
        document.querySelector(".game").appendChild(box);
    }
}
function handleClick(){
    /* alert("Hello!") Testei com um alert*/
    /* a função vai manusear HANDLE com o CLICK clique duas variáveis */
    if(openCards.length < 2){
        this.classList.add("boxOpen");
        openCards.push(this);
    }

    if(openCards.length == 2){
        setTimeout(checkMatch, 500);
    }

}

function checkMatch(){
    if(openCards[0].innerHTML === openCards[1].innerHTML){
        openCards[0].classList.add("boxMatch");
        openCards[1].classList.add("boxMatch");
        contadorAcertos++
        playSound("hit4")

    } else {
        openCards[0].classList.remove("boxOpen");
        openCards[1].classList.remove("boxOpen");
        //incrementado um contador de erros
        contadorErros++
        erros.textContent = contadorErros
    }

    openCards = []; /*depois de executado as condições eu preciso limpar o meu vetor de manejo */

    //Criando uma condição que declara o fim do jogo
    if(document.querySelectorAll(".boxMatch").length === emojis.length){
        clearInterval(timer);
        alert("Você venceu, parabéns! Clique em RESET GAME para jogar novamente!")
    }
}

let timeLeft = 30; // Tempo inicial em segundos
let timer; // Variável para armazenar o intervalo


function startCountdown() {
    jogar(); //Só abre as cartas quando clicar em iniciar
    clearInterval(timer); // Garante que não haja múltiplas contagens ao clicar várias vezes
    timer = setInterval(() => {
        if (timeLeft > 0) {
            timeLeft--; // Decrementa o tempo
            document.getElementById("time").textContent = timeLeft; // Atualiza na tela
        } else {
            clearInterval(timer); // Para o contador quando chega a 0
            alert(`Tempo esgotado, você acerto ${contadorAcertos} pares e cometeu ${contadorErros} erros`);
            window.location.reload()
        }
    }, 1000); // Atualiza a cada 1 segundo
}

function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.mp3`);
    audio.volume = 0.4;
    audio.play();
}
/* vou Incrementar número de erros e tempo para reload 💪😎 */
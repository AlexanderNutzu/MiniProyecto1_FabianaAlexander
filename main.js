/*Empezando archivos*/

const colors = ["red", "green", "blue", "yellow"];
let sequence = [];
let playerSequence = [];
let level = 1;
let isGameActive = false;
let jugador= null;

const startBtn = document.getElementById("start-btn");
const levelDisplay = document.getElementById("level");
const colorButtons = document.querySelectorAll(".color-btn");
const scoreTableBody = document.querySelector("#score-table tbody");

//Cargar puntuaciones al iniciar
loadScores();

startBtn.addEventListener("click", inicioJuego);

colorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (isGameActive) {
            const color = button.id;
            playerSequence.push(color);
            animateButton(color);
            playSound(color);
            checkSequence();
        }
    });
});

function inicioJuego() {
    jugador=prompt("Ingresa tu nombre:");
    sequence = [];
    playerSequence = [];
    level = 1;
    isGameActive = true;
    levelDisplay.textContent = `Level: ${level}`;
    startBtn.disabled = true;
    nextLevel();
}

function nextLevel() {
    playerSequence = [];
    sequence.push(colors[Math.floor(Math.random() * colors.length)]);
    playSequence();
}

function playSequence() {
    let i = 0;
    const interval = setInterval(() => {
        animateButton(sequence[i]);
        playSound(sequence[i]);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
        }
    }, 1000);
}

function animateButton(color) {
    const button = document.getElementById(color);
    button.style.opacity = "1";
    setTimeout(() => {
        button.style.opacity = "0.6";
    }, 500);
}

function playSound(color) {
    const sound = document.getElementById(`${color}-sound`);
    sound.currentTime = 0;
    sound.play();
}

function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            finJuego();
            return;
        }
    }
    if (playerSequence.length === sequence.length) {
        level++;
        levelDisplay.textContent = `Level: ${level}`;
        setTimeout(nextLevel, 1000);
    }
}

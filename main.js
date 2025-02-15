/*Empezando archivos*/

const colors = ["red", "green", "blue", "yellow"];
let sequence = [];
let playerSequence = [];
let level = 1;
let isGameActive = false;
let jugador= null;

const Menu = document.getElementById("Menu");
const Juego = document.getElementById("Juego");
const startBtn = document.getElementById("start-btn");
const regreso = document.getElementById("regreso");
const levelDisplay = document.getElementById("level");
const colorButtons = document.querySelectorAll(".color-btn");
const scoreTableBody = document.querySelector("#score-table tbody");


//Cargar puntuaciones al iniciar
loadScores();

startBtn.addEventListener("click", function(){
    Menu.classList.add("oculto");
    Juego.classList.remove("oculto");
    inicioJuego();
});

regreso.addEventListener("click", regresarMenu);

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
        };
    }, 1000);
};

function animateButton(color) {
    const button = document.getElementById(color);
    button.classList.add("active"); //button.style.opacity = "1";
    setTimeout(() => {
        button.classList.remove("active"); //button.style.opacity = "0.6";
    }, 500);
};

function playSound(color) {
    const sound = document.getElementById(`${color}-sound`);
    sound.currentTime = 0;
    sound.play();
};

function checkSequence() {
    for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== sequence[i]) {
            finJuego();
            return;
        };
    };
    if (playerSequence.length === sequence.length) {
        level++;
        levelDisplay.textContent = `Level: ${level}`;
        setTimeout(nextLevel, 1000);
    };
};

function finJuego() {
    alert(`ohhh perdiste.. Suerte la proxima... ${level}`);
    regresarMenu()
};

function salvaPuntaje(score) {
    //const playerName = prompt("Ingresa tu nombre:");
    const playerName =jugador;
    if (playerName) {
        const scores = JSON.parse(localStorage.getItem("scores")) || [];
        scores.push({ name: playerName, score: score });
        localStorage.setItem("scores", JSON.stringify(scores));
    };
};

function loadScores() {
    const scores = JSON.parse(localStorage.getItem("scores")) || [];
    scoreTableBody.innerHTML = ""; // Limpiar la tabla antes de cargar los datos
    scores.sort((a, b) => b.score - a.score).forEach(score => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${score.name}</td>
            <td>${score.score}</td>
        `;
        scoreTableBody.appendChild(row);
    });
};

function regresarMenu(){
    isGameActive = false;
    startBtn.disabled = false;
    salvaPuntaje(level);
    loadScores();
    Juego.classList.add("oculto");
    Menu.classList.remove("oculto");
}
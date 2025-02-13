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


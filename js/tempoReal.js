// js/tempoReal.js

import { getTitulares } from "./team.js";
import { myTeam } from "./team.js";
import { mostrarTelaSubstituicoes } from "./substituicoes.js";

let minutoAtual = 0;
let intervaloAtivo = false;
let intervalId = null;

export function iniciarPartidaTempoReal(adversario) {
  minutoAtual = 0;
  intervaloAtivo = false;
  const eventos = [];

  const container = document.getElementById("partida-container");
  container.innerHTML = `
    <div id="partida-screen" class="game-screen active">
      <h2>Partida em andamento</h2>
      <div class="scoreboard">
        <span id="home-team-name-scoreboard">${myTeam.name}</span>
        <span id="home-score">0</span>
        <span> - </span>
        <span id="away-score">0</span>
        <span id="away-team-name-scoreboard">${adversario}</span>
      </div>
      <p id="match-minute">Minuto: 0</p>

      <div class="match-events-container">
        <h3>Eventos</h3>
        <ul id="events-list" class="scrollable match-event-list"></ul>
      </div>

      <div class="subs-actions">
        <button id="substituir-btn" class="main-btn">🔁 Substituir</button>
        <button id="taticas-btn" class="main-btn">📋 Táticas</button>
        <button id="encerrar-btn" class="main-btn">⏹️ Encerrar Partida</button>
      </div>
    </div>
  `;

  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  container.classList.add('active');

  document.getElementById("substituir-btn").onclick = () => mostrarTelaSubstituicoes();
  document.getElementById("taticas-btn").onclick = () => alert("⚙️ Alteração tática aplicada!");
  document.getElementById("encerrar-btn").onclick = () => pararPartida();

  intervalId = setInterval(() => {
    minutoAtual++;
    document.getElementById("match-minute").textContent = `Minuto: ${minutoAtual}`;

    // Evento a cada 8 minutos
    if (minutoAtual % 8 === 0) gerarEvento(adversario);

    // Intervalo no minuto 45
    if (minutoAtual === 45 && !intervaloAtivo) {
      intervaloAtivo = true;
      clearInterval(intervalId);
      alert("⏸️ Intervalo! Faça substituições ou ajuste táticas.");
    }

    // Fim do jogo
    if (minutoAtual >= 90) {
      pararPartida();
      alert("🏁 Fim da Partida!");
    }
  }, 500);
}

function gerarEvento(adversario) {
  const jogadores = getTitulares();
  const autor = jogadores[Math.floor(Math.random() * jogadores.length)];
  const chance = Math.random();
  let evento = "";

  if (chance < 0.4) {
    evento = `⚽ Gol de ${autor.name} aos ${minutoAtual}'`;
    atualizarPlacar("home-score");
  } else if (chance < 0.6) {
    evento = `⚽ Gol de ${adversario} aos ${minutoAtual}'`;
    atualizarPlacar("away-score");
  } else if (chance < 0.8) {
    evento = `🟨 Cartão para ${autor.name} aos ${minutoAtual}'`;
  } else {
    evento = `🔁 Substituição de ${autor.name} programada`; // decorativo
  }

  const lista = document.getElementById("events-list");
  const li = document.createElement("li");
  li.textContent = evento;
  lista.appendChild(li);
  lista.scrollTop = lista.scrollHeight;
}

function atualizarPlacar(id) {
  const el = document.getElementById(id);
  el.textContent = parseInt(el.textContent) + 1;
}

function pararPartida() {
  clearInterval(intervalId);
  document.getElementById("main-game-screen").classList.add("active");
  document.getElementById("partida-screen").remove();
}

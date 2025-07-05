// js/match.js

import { clubesSerieA, clubesSerieB } from "./clubes.js";
import { myTeam, getTitulares } from "./team.js";

export function initMatch() {
  console.log("Iniciando simulação de partida...");

  // Escolhe adversário aleatório diferente do seu time
  const adversarios = clubesSerieA.concat(clubesSerieB).filter(t => t !== myTeam.name);
  const adversario = adversarios[Math.floor(Math.random() * adversarios.length)];

  const homeScore = Math.floor(Math.random() * 4);
  const awayScore = Math.floor(Math.random() * 4);

  const eventos = gerarEventosMatch(homeScore + awayScore);

  const container = document.getElementById("partida-container");
  container.innerHTML = `
    <div id="partida-screen" class="game-screen active">
      <h2>Simulação de Partida</h2>
      <div class="scoreboard">
        <span id="home-team-name-scoreboard">${myTeam.name}</span>
        <span id="home-score">${homeScore}</span>
        <span> - </span>
        <span id="away-score">${awayScore}</span>
        <span id="away-team-name-scoreboard">${adversario}</span>
      </div>
      <p id="match-minute" class="match-minute-display">Minuto: 90</p>

      <div class="match-events-container">
        <h3>Eventos da Partida</h3>
        <ul id="events-list" class="scrollable match-event-list">
          ${eventos.map(e => `<li>${e}</li>`).join("\n")}
        </ul>
      </div>

      <div class="subs-actions">
        <button class="main-btn" onclick="voltarMenu()">Voltar</button>
      </div>
    </div>
  `;

  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  container.classList.add('active');
}

function gerarEventosMatch(totalGols) {
  const jogadores = getTitulares();
  const eventos = [];
  for (let i = 0; i < totalGols; i++) {
    const minuto = Math.floor(Math.random() * 90);
    const jogador = jogadores[Math.floor(Math.random() * jogadores.length)];
    eventos.push(`⚽ Gol de ${jogador.name} aos ${minuto}'`);
  }
  if (totalGols < 3) eventos.push("🟨 Cartão amarelo aos 44'");
  if (totalGols === 0) eventos.push("🟥 Cartão vermelho aos 67'");
  return eventos;
}

window.voltarMenu = function () {
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  document.getElementById("main-game-screen").classList.add("active");
};

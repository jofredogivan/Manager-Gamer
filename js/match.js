// js/match.js

export function initMatch() {
  console.log("Iniciando simulação de partida...");

  // Simulação de placar aleatório
  const homeScore = Math.floor(Math.random() * 5);
  const awayScore = Math.floor(Math.random() * 5);

  document.getElementById("home-score").textContent = homeScore;
  document.getElementById("away-score").textContent = awayScore;
  document.getElementById("match-minute").textContent = "Minuto: 90";
  document.getElementById("events-list").innerHTML = `
    <li>⚽ Gol marcado aos 23'</li>
    <li>🟥 Cartão vermelho aos 45'</li>
    <li>⚽ Gol marcado aos 78'</li>
  `;

  // Cria dinamicamente a tela se necessário
  const container = document.getElementById("partida-container");
  container.innerHTML = `
    <div id="partida-screen" class="game-screen active">
      <h2>Simulação de Partida</h2>
      <div class="scoreboard">
        <span id="home-team-name-scoreboard">${"Meu Time"}</span>
        <span id="home-score">${homeScore}</span>
        <span> - </span>
        <span id="away-score">${awayScore}</span>
        <span id="away-team-name-scoreboard">${"Adversário"}</span>
      </div>
      <p id="match-minute" class="match-minute-display">Minuto: 90</p>

      <div class="match-events-container">
        <h3>Eventos da Partida</h3>
        <ul id="events-list" class="scrollable match-event-list">
          <li>⚽ Gol marcado aos 23'</li>
          <li>🟥 Cartão vermelho aos 45'</li>
          <li>⚽ Gol marcado aos 78'</li>
        </ul>
      </div>

      <div class="subs-actions">
        <button class="main-btn" onclick="voltarMenu()">Voltar</button>
      </div>
    </div>
  `;

  // Mostra a tela de partida
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  container.classList.add('active');
}

window.voltarMenu = function () {
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  document.getElementById("main-game-screen").classList.add("active");
};

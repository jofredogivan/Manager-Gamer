// js/match.js

export function initMatch() {
  console.log("Iniciando simulação de partida...");

  // Exemplo de lógica simples de simulação
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

  // Exibe a tela de partida
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  document.getElementById('partida-screen').classList.add('active');
}

// js/substituicoes.js

import { myTeam } from "./team.js";

export function mostrarTelaSubstituicoes() {
  const titulares = myTeam.players.filter(p => p.status === "Titular");
  const reservas = myTeam.players.filter(p => p.status === "Reserva");

  const container = document.getElementById("partida-container");
  container.innerHTML = `
    <div class="game-screen active">
      <h2>Substituições</h2>
      <div class="scrollable">
        <h3>Jogadores Titulares</h3>
        <ul>
          ${titulares.map((j, i) => `<li>${j.name} (${j.position}) <button onclick="substituir(${i})">🔁</button></li>`).join("")}
        </ul>
        <h3>Reservas</h3>
        <ul>
          ${reservas.map((j, i) => `<li>${j.name} (${j.position})</li>`).join("")}
        </ul>
      </div>
      <div class="subs-actions">
        <button class="main-btn" onclick="voltarPartida()">Voltar</button>
      </div>
    </div>
  `;
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  container.classList.add('active');
}

window.substituir = function(indiceTitular) {
  const titulares = myTeam.players.filter(p => p.status === "Titular");
  const reservas = myTeam.players.filter(p => p.status === "Reserva");

  const titular = titulares[indiceTitular];
  const reserva = reservas.find(r => r.position === titular.position);

  if (!reserva) return alert("Nenhum reserva disponível para esta posição.");

  titular.status = "Reserva";
  reserva.status = "Titular";
  alert(`🔁 ${titular.name} saiu, ${reserva.name} entrou.`);
  mostrarTelaSubstituicoes();
};

window.voltarPartida = function() {
  document.getElementById("simulate-match-btn").click();
};

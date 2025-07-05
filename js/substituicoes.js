// js/substituicoes.js

import { myTeam, getTitulares, getReservas } from "./team.js";

let substituicoesFeitas = 0;
const MAX_SUBS = 3;

export function mostrarTelaSubstituicoes() {
  const container = document.getElementById("partida-container");

  const titulares = getTitulares();
  const reservas = getReservas();

  container.innerHTML = `
    <div id="substituicoes-screen" class="game-screen active">
      <h2>Substituições</h2>
      <div class="substitution-lists-container">
        <div class="player-list-section">
          <h3>Titulares</h3>
          <ul id="titulares-list">
            ${titulares.map((p, i) => `<li><button onclick="selecionarTitular(${i})">${p.name} (${p.position})</button></li>`).join('')}
          </ul>
        </div>
        <div class="player-list-section">
          <h3>Reservas</h3>
          <ul id="reservas-list">
            ${reservas.map((p, i) => `<li><button onclick="selecionarReserva(${i})">${p.name} (${p.position})</button></li>`).join('')}
          </ul>
        </div>
      </div>
      <div class="subs-actions">
        <button class="main-btn" onclick="cancelarSubs()">Cancelar</button>
      </div>
    </div>
  `;

  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  container.classList.add('active');
}

let titularSelecionado = null;
let reservaSelecionado = null;

window.selecionarTitular = function (index) {
  titularSelecionado = index;
  verificarTroca();
};

window.selecionarReserva = function (index) {
  reservaSelecionado = index;
  verificarTroca();
};

function verificarTroca() {
  if (titularSelecionado !== null && reservaSelecionado !== null && substituicoesFeitas < MAX_SUBS) {
    const titular = getTitulares()[titularSelecionado];
    const reserva = getReservas()[reservaSelecionado];

    const titularIndex = myTeam.players.findIndex(p => p.name === titular.name);
    const reservaIndex = myTeam.players.findIndex(p => p.name === reserva.name);

    if (titularIndex !== -1 && reservaIndex !== -1) {
      myTeam.players[titularIndex].status = "reserva";
      myTeam.players[reservaIndex].status = "titular";
      substituicoesFeitas++;
      alert(`Substituição realizada: ${titular.name} por ${reserva.name}`);
    }
    mostrarTelaSubstituicoes();
  }
}

window.cancelarSubs = function () {
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  document.getElementById("main-game-screen").classList.add("active");
};

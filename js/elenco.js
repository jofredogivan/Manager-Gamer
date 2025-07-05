// js/elenco.js

import { myTeam, getTitulares, getReservas } from "./team.js";

export function mostrarElenco() {
  const container = document.getElementById("elenco-container");
  container.innerHTML = `
    <div class="game-screen active">
      <h2>Elenco do ${myTeam.name}</h2>

      <div class="scrollable">
        <h3 class="section-title">Titulares</h3>
        <ul>
          ${getTitulares().map(p => `
            <li><strong>${p.name}</strong> (${p.position}) - Habilidade: ${p.skill} | Stamina: ${p.stamina}</li>
          `).join('')}
        </ul>

        <h3 class="section-title">Reservas</h3>
        <ul>
          ${getReservas().map(p => `
            <li><strong>${p.name}</strong> (${p.position}) - Habilidade: ${p.skill} | Stamina: ${p.stamina}</li>
          `).join('')}
        </ul>
      </div>

      <button class="main-btn" onclick="voltarMenu()">Voltar</button>
    </div>
  `;

  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  container.classList.add('active');
}

window.voltarMenu = function () {
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  document.getElementById("main-game-screen").classList.add('active');
};

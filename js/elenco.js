// js/elenco.js

import { myTeam, getReservas } from "./team.js";

export function mostrarElenco() {
  const container = document.getElementById("elenco-container");
  container.innerHTML = `
    <div class="game-screen active">
      <h2>Elenco do ${myTeam.name}</h2>
      <ul class="scrollable">
        ${myTeam.players.map(p => `
          <li>
            <strong>${p.name}</strong> - ${p.position} | Habilidade: ${p.skill} | Stamina: ${p.stamina}%
            <span class="status-tag">[${p.status}]</span>
          </li>`).join("")}
      </ul>
      <button class="main-btn" onclick="fecharElenco()">Voltar</button>
    </div>
  `;
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  container.classList.add('active');
}

window.fecharElenco = function() {
  document.getElementById("main-game-screen").classList.add("active");
  document.getElementById("elenco-container").innerHTML = "";
};

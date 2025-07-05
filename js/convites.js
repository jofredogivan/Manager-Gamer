// js/convites.js

import { clubesSerieA, clubesSerieB } from "./clubes.js";
import { myTeam, generateTeamPlayers } from "./team.js";
import { iniciarTemporada } from "./temporada.js";

export function verificarConvite(posicaoFinal, reputacao) {
  const container = document.getElementById("partida-container");
  const elegiveis = clubesSerieA
    .filter(time => time !== myTeam.name)
    .slice(0, 10); // apenas times grandes

  if (posicaoFinal <= 8 || reputacao >= 60) {
    const clubeAlvo = elegiveis[Math.floor(Math.random() * elegiveis.length)];
    container.innerHTML = `
      <div class="game-screen active" id="convite-screen">
        <h2>📩 Oferta de Emprego</h2>
        <p>Você foi sondado pelo <strong>${clubeAlvo}</strong> para assumir como técnico!</p>
        <p>Salário: R$ ${5000 + reputacao * 100}/semana</p>
        <p>Expectativa: Top 6 da temporada</p>
        <div class="subs-actions">
          <button class="main-btn" onclick="aceitarNovoClube('${clubeAlvo}')">Aceitar Oferta</button>
          <button class="main-btn" onclick="rejeitarConvite()">Rejeitar</button>
        </div>
      </div>
    `;
    document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
    container.classList.add("active");
  }
}

window.aceitarNovoClube = function(nomeTime) {
  myTeam.name = nomeTime;
  myTeam.money += 100000;
  myTeam.reputation += 20;
  generateTeamPlayers();
  iniciarTemporada();
  alert(`Novo clube assumido: ${nomeTime}`);
  document.getElementById("main-game-screen").classList.add("active");
  document.getElementById("convite-screen").remove();
};

window.rejeitarConvite = function() {
  alert("Você decidiu permanecer no seu clube atual.");
  document.getElementById("main-game-screen").classList.add("active");
  document.getElementById("convite-screen").remove();
};

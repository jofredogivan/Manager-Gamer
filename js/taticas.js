// js/taticas.js

import { myTeam } from "./team.js";

export function mostrarTelaTaticas() {
  const container = document.getElementById("taticas-container");
  container.innerHTML = `
    <div class="game-screen active">
      <h2>Configurar Táticas</h2>
      <div>
        <h3>Formação</h3>
        <select id="formacao-select">
          <option value="4-4-2">4-4-2</option>
          <option value="4-3-3">4-3-3</option>
          <option value="3-5-2">3-5-2</option>
        </select>
      </div>
      <div>
        <h3>Mentalidade</h3>
        <select id="mentalidade-select">
          <option value="defensive">Defensiva</option>
          <option value="balanced">Equilibrada</option>
          <option value="attacking">Ofensiva</option>
        </select>
      </div>
      <button class="main-btn" onclick="salvarTaticas()">Salvar</button>
      <button class="main-btn" onclick="fecharTaticas()">Voltar</button>
    </div>
  `;
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  container.classList.add('active');
  document.getElementById("formacao-select").value = myTeam.formation;
  document.getElementById("mentalidade-select").value = myTeam.mentality;
}

window.salvarTaticas = function() {
  myTeam.formation = document.getElementById("formacao-select").value;
  myTeam.mentality = document.getElementById("mentalidade-select").value;
  alert("Táticas salvas com sucesso!");
  fecharTaticas();
};

window.fecharTaticas = function() {
  document.getElementById("main-game-screen").classList.add("active");
  document.getElementById("taticas-container").innerHTML = "";
};

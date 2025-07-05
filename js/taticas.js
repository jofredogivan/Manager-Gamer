// js/taticas.js

import { myTeam } from "./team.js";

const formacoesDisponiveis = [
  { nome: "4-4-2", descricao: "4 zagueiros, 4 meio-campistas, 2 atacantes" },
  { nome: "4-3-3", descricao: "4 zagueiros, 3 meio-campistas, 3 atacantes" },
  { nome: "3-5-2", descricao: "3 zagueiros, 5 meio-campistas, 2 atacantes" },
  { nome: "5-3-2", descricao: "5 defensores, 3 meio-campistas, 2 atacantes" }
];

export function mostrarTelaTaticas() {
  const container = document.getElementById("taticas-container");

  container.innerHTML = `
    <div id="taticas-screen" class="game-screen active">
      <h2>Formações Táticas</h2>
      <div class="scrollable">
        ${formacoesDisponiveis.map(f => `
          <button class="main-btn" onclick="selecionarFormacao('${f.nome}')">
            ${f.nome} - ${f.descricao}
          </button>
        `).join('')}
      </div>
      <button class="main-btn" onclick="voltarMenu()">Voltar</button>
    </div>
  `;

  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  container.classList.add('active');
}

window.selecionarFormacao = function(formacao) {
  myTeam.formacao = formacao;
  alert(`Formação ${formacao} aplicada ao time!`);
  voltarMenu();
};

window.voltarMenu = function () {
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  document.getElementById("main-game-screen").classList.add("active");
};

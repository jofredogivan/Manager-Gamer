// js/main.js

import { initMatch } from "./match.js";
import { myTeam, generateTeamPlayers } from "./team.js";
import { iniciarCopa } from "./cup.js";
import { salvarJogo, carregarJogo } from "./storage.js";
import { aumentarReputacao } from "./reputation.js";
import { sortearTimeRebaixado } from "./clubes.js";
import { mostrarElenco } from "./elenco.js";
import { mostrarTelaSubstituicoes } from "./substituicoes.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Jogo carregado");

  // Sorteia time inicial para o técnico
  const timeSorteado = sortearTimeRebaixado();
  myTeam.name = timeSorteado;

  // Gera elenco
  generateTeamPlayers();
  atualizarHeader();

  // Botões principais
  document.getElementById("simulate-match-btn")?.addEventListener("click", () => {
    initMatch();
    aumentarReputacao(5);
  });

  document.getElementById("iniciar-copa-btn")?.addEventListener("click", () => {
    iniciarCopa(myTeam.name);
  });

  document.getElementById("salvar-btn")?.addEventListener("click", () => {
    salvarJogo(myTeam);
  });

  document.getElementById("carregar-btn")?.addEventListener("click", () => {
    const dados = carregarJogo();
    if (dados) {
      Object.assign(myTeam, dados);
      atualizarHeader();
    }
  });

  document.getElementById("view-squad-btn")?.addEventListener("click", () => {
    mostrarElenco();
  });

  // Botão de substituições (caso exista dinamicamente)
  document.addEventListener("click", (e) => {
    if (e.target && e.target.id === "abrir-substituicoes-btn") {
      mostrarTelaSubstituicoes();
    }
  });
});

function atualizarHeader() {
  document.getElementById("current-season").textContent = myTeam.season;
  document.getElementById("current-round").textContent = myTeam.round;
  document.getElementById("my-team-name").textContent = myTeam.name;
  document.getElementById("team-money").textContent = "R$ " + myTeam.money.toLocaleString();
  document.getElementById("team-nome").textContent = myTeam.name;
}

// js/main.js

import { initMatch } from "./match.js";
import { myTeam, generateTeamPlayers } from "./team.js";
import { iniciarCopa } from "./cup.js";
import { salvarJogo, carregarJogo } from "./storage.js";
import { aumentarReputacao } from "./reputation.js";
import { sortearTimeRebaixado } from "./clubes.js";
import { mostrarElenco } from "./elenco.js";
import { mostrarTelaSubstituicoes } from "./substituicoes.js";
import { mostrarTelaTaticas } from "./taticas.js";
import { iniciarTemporada, simularRodada, getClassificacao } from "./temporada.js";
import { iniciarPartidaTempoReal } from "./tempoReal.js";
import { verificarConvite } from "./convites.js";

document.addEventListener("DOMContentLoaded", () => {
  const timeSorteado = sortearTimeRebaixado();
  myTeam.name = timeSorteado;
  generateTeamPlayers();
  iniciarTemporada();
  atualizarHeader();

  document.getElementById("simulate-match-btn")?.addEventListener("click", () => {
    const resultado = simularRodada();
    if (resultado.fim) {
      alert(resultado.mensagem);
      const classificacao = getClassificacao();
      const posicao = classificacao.find(t => t.time === myTeam.name)?.pos;
      verificarConvite(posicao, myTeam.reputation);
      return;
    }
    iniciarPartidaTempoReal(resultado.adversario);
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

  document.getElementById("view-tactics-btn")?.addEventListener("click", () => {
    mostrarTelaTaticas();
  });

  document.getElementById("view-standings-btn")?.addEventListener("click", () => {
    mostrarClassificacao();
  });

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

function atualizarClassificacao() {
  const tabela = getClassificacao();
  const corpo = document.getElementById("standings-body");
  corpo.innerHTML = tabela.map(t => `
    <tr class="${t.time === myTeam.name ? 'player-team-row' : ''}">
      <td>${t.pos}</td>
      <td>${t.time}</td>
      <td>${t.v + t.e + t.d}</td>
      <td>${t.v}</td>
      <td>${t.e}</td>
      <td>${t.d}</td>
      <td>${t.gp}</td>
      <td>${t.gc}</td>
      <td>${t.gp - t.gc}</td>
      <td>${t.pts}</td>
    </tr>
  `).join("");
}

function mostrarClassificacao() {
  document.querySelectorAll('.game-screen').forEach(div => div.classList.remove('active'));
  document.getElementById("standings-screen").classList.add("active");
  atualizarClassificacao();
}

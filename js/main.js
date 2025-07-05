// js/main.js

import { initMatch } from "./match.js";

document.addEventListener("DOMContentLoaded", () => {
  console.log("Jogo carregado");

  const partidaContainer = document.getElementById("partida-container");
  const simulateBtn = document.getElementById("simulate-match-btn");

  // Ativa o botão da simulação se estiver presente
  if (simulateBtn) {
    simulateBtn.addEventListener("click", () => {
      initMatch();
    });
  }

  // Exemplo de ativação inicial se quiser simular direto:
  // initMatch();
});

// js/cup.js

import { myTeam } from "./team.js";
import { clubesSerieB } from "./clubes.js";

export function iniciarCopa(timePrincipal) {
  const adversario = clubesSerieB[Math.floor(Math.random() * clubesSerieB.length)];
  const resultado = Math.random();
  let mensagem = "";

  if (resultado > 0.5) {
    mensagem = `🏆 Vitória contra ${adversario} na Copa!`;
    myTeam.money += 10000;
  } else {
    mensagem = `❌ Derrota para ${adversario}. Eliminado na 1ª fase da Copa.`;
  }

  alert(mensagem);
}

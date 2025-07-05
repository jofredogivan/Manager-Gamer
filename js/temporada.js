// js/temporada.js

import { clubesSerieA, clubesSerieB } from "./clubes.js";
import { myTeam } from "./team.js";

let rodadaAtual = 1;
let totalRodadas = 38;

const tabela = {};
const jogos = [];

export function iniciarTemporada() {
  const todosOsTimes = [...clubesSerieA];
  if (!todosOsTimes.includes(myTeam.name)) todosOsTimes[0] = myTeam.name;

  // Iniciar classificação
  todosOsTimes.forEach(time => {
    tabela[time] = {
      time,
      pts: 0,
      v: 0,
      e: 0,
      d: 0,
      gp: 0,
      gc: 0
    };
  });

  // Gerar confrontos aleatórios sem repetição direta
  while (jogos.length < totalRodadas) {
    const adversarios = todosOsTimes.filter(t => t !== myTeam.name);
    const sorteado = adversarios[Math.floor(Math.random() * adversarios.length)];
    if (!jogos.includes(sorteado)) jogos.push(sorteado);
  }
}

export function simularRodada() {
  if (rodadaAtual > totalRodadas) return "Temporada encerrada";

  const adversario = jogos[rodadaAtual - 1];
  const golsMeuTime = Math.floor(Math.random() * 5);
  const golsAdversario = Math.floor(Math.random() * 5);

  // Atualizar tabela
  tabela[myTeam.name].gp += golsMeuTime;
  tabela[myTeam.name].gc += golsAdversario;
  tabela[adversario].gp += golsAdversario;
  tabela[adversario].gc += golsMeuTime;

  if (golsMeuTime > golsAdversario) {
    tabela[myTeam.name].pts += 3;
    tabela[myTeam.name].v++;
    tabela[adversario].d++;
  } else if (golsMeuTime < golsAdversario) {
    tabela[adversario].pts += 3;
    tabela[adversario].v++;
    tabela[myTeam.name].d++;
  } else {
    tabela[myTeam.name].pts += 1;
    tabela[adversario].pts += 1;
    tabela[myTeam.name].e++;
    tabela[adversario].e++;
  }

  rodadaAtual++;
  return {
    rodada: rodadaAtual - 1,
    adversario,
    placar: `${golsMeuTime} x ${golsAdversario}`,
  };
}

export function getClassificacao() {
  const tabelaArray = Object.values(tabela);
  tabelaArray.sort((a, b) => b.pts - a.pts || (b.gp - b.gc) - (a.gp - a.gc));
  return tabelaArray.map((t, i) => ({ pos: i + 1, ...t }));
}

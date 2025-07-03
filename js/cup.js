// js/cup.js
import { getTeams } from './team.js';
import { showMessage } from './ui.js';

let copaEtapas = [];
let etapaAtualCopa = 0;

export function initCup() {
  document.getElementById('iniciar-copa-btn')?.addEventListener('click', iniciarCopa);
}

function iniciarCopa() {
  const participantes = getTeams().slice(0, 8);
  shuffle(participantes);
  copaEtapas = [
    { fase: 'Quartas', jogos: gerarChaveamentos(participantes) },
    { fase: 'Semifinal', jogos: [] },
    { fase: 'Final', jogos: [] }
  ];
  etapaAtualCopa = 0;
  showMessage('Copa iniciada!', 'success');
  exibirProximaFaseCopa();
}

function gerarChaveamentos(times) {
  const jogos = [];
  for (let i = 0; i < times.length; i += 2) {
    jogos.push({ timeA: times[i], timeB: times[i + 1], resultado: null });
  }
  return jogos;
}

function exibirProximaFaseCopa() {
  const etapa = copaEtapas[etapaAtualCopa];
  if (!etapa) return showMessage('Copa finalizada!', 'success');
  etapa.jogos.forEach(jogo => {
    const golsA = Math.floor(Math.random() * 4);
    const golsB = Math.floor(Math.random() * 4);
    jogo.resultado = `${jogo.timeA.name} ${golsA} x ${golsB} ${jogo.timeB.name}`;
  });
  const vencedores = etapa.jogos.map(j => (parseInt(j.resultado.split(' ')[1]) > parseInt(j.resultado.split(' ')[3]) ? j.timeA : j.timeB));
  etapaAtualCopa++;
  if (etapaAtualCopa < copaEtapas.length) {
    copaEtapas[etapaAtualCopa].jogos = gerarChaveamentos(vencedores);
  }
  alert(etapa.jogos.map(j => j.resultado).join('\n'));
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

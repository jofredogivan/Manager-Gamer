// js/core.js
import { getTeams, chooseTeam } from './team.js';
import { showMessage, showScreen, updateInfo } from './ui.js';
import { simulateMatch } from './match.js';

let allTeams = [];
let coachReputation = 0;

export function initCore() {
  allTeams = getTeams();
  const list = document.getElementById('team-selection-list');
  list.innerHTML = '';

  const rebaixados = [...allTeams].sort((a, b) => a.pontos - b.pontos).slice(0, 5);
  rebaixados.forEach(team => {
    const li = document.createElement('li');
    li.innerHTML = `${team.name} (${team.pontos} pts) <button onclick="window.selectTeam('${team.name}')">Assumir</button>`;
    list.appendChild(li);
  });

  window.selectTeam = (name) => {
    const my = chooseTeam(name);
    updateInfo(my);
    showScreen('main-game-screen');
  };

  document.getElementById('next-round-btn')?.addEventListener('click', () => {
    simulateMatch('Santa Cruz', 'Botafogo'); // temporário para testes
  });
}

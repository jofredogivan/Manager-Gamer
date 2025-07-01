// js/ui.js

export function showMessage(msg, type = 'info') {
  const el = document.getElementById('game-message');
  if (!el) return;
  el.textContent = msg;
  el.className = 'game-message game-message-' + type;
}

export function showScreen(id) {
  document.querySelectorAll('.game-screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) target.classList.add('active');
}

export function updateInfo(myTeam) {
  document.getElementById('current-season').textContent = myTeam.season;
  document.getElementById('current-round').textContent = myTeam.round;
  document.getElementById('my-team-name').textContent = myTeam.name;
  document.getElementById('team-money').textContent = formatMoney(myTeam.money);

  const banner = document.getElementById('team-banner');
  const escudo = document.getElementById('team-escudo');
  const nome = document.getElementById('team-nome');
  if (banner && escudo && nome) {
    banner.style.backgroundColor = myTeam.cor || '#333';
    escudo.textContent = myTeam.escudo || '⚽';
    nome.textContent = myTeam.name;
  }
}

function formatMoney(value) {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export async function loadPartials() {
  const areas = [
    { id: 'elenco-container', file: 'partials/elenco.html' },
    { id: 'taticas-container', file: 'partials/taticas.html' },
    { id: 'partida-container', file: 'partials/partida.html' }
  ];

  for (const area of areas) {
    const container = document.getElementById(area.id);
    if (container) {
      try {
        const res = await fetch(area.file);
        const html = await res.text();
        container.innerHTML = html;
      } catch (e) {
        console.warn(`Erro ao carregar ${area.file}`, e);
      }
    }
  }
}

export function initUI() {
  // Reatribuir eventos aos botões após carregamento de partials se necessário
  document.getElementById('view-squad-btn')?.addEventListener('click', () => showScreen('elenco-screen'));
  document.getElementById('view-tactics-btn')?.addEventListener('click', () => showScreen('taticas-screen'));
}

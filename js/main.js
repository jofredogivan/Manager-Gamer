// js/main.js
import { initCore } from './core.js';      // CORRIGIDO: de './js/core.js' para './core.js'
import { initMatch, continueMatch } from './match.js'; // CORRIGIDO
import { initCup } from './cup.js';        // CORRIGIDO
import { loadPartials, initUI } from './ui.js'; // CORRIGIDO

window.addEventListener('DOMContentLoaded', async () => {
  await loadPartials();
  initUI();
  initCore();
  initCup();

  document.getElementById('continue-match-btn')?.addEventListener('click', continueMatch);
});

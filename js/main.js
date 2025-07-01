// main.js
import { initCore } from './js/core.js';
import { initMatch, continueMatch } from './js/match.js';
import { initCup } from './js/cup.js';
import { loadPartials, initUI } from './js/ui.js';

window.addEventListener('DOMContentLoaded', async () => {
  await loadPartials();
  initUI();
  initCore();
  initCup();

  document.getElementById('continue-match-btn')?.addEventListener('click', continueMatch);
});

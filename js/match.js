// js/match.js
import { myTeam, startingEleven, bench } from './team.js';
import { showMessage, showScreen } from './ui.js';

let matchMinute = 0;
let matchInterval = null;
let substitutionsLeft = 3;
let currentMatch = null;

export function simulateMatch(home, away) {
  currentMatch = { home, away, homeGoals: 0, awayGoals: 0 };
  matchMinute = 0;
  substitutionsLeft = 3;
  showScreen('partida-screen');
  showMessage(`Iniciando ${home} x ${away}`);

  matchInterval = setInterval(() => {
    matchMinute += 5;
    document.getElementById('match-minute').textContent = `Minuto: ${matchMinute}`;

    if (Math.random() < 0.15) {
      const team = Math.random() < 0.5 ? 'home' : 'away';
      currentMatch[team + 'Goals']++;
      const teamName = currentMatch[team];
      addEvent(`Gol do ${teamName}!`);
      updateScoreboard();
    }

    if (matchMinute === 45 || matchMinute === 70) {
      clearInterval(matchInterval);
      document.getElementById('pause-match-for-subs-btn').style.display = 'inline-block';
      document.getElementById('continue-match-btn').style.display = 'inline-block';
      return;
    }

    if (matchMinute >= 90) {
      clearInterval(matchInterval);
      addEvent('Fim da partida.');
    }
  }, 600);
}

function addEvent(txt) {
  const el = document.createElement('li');
  el.textContent = txt;
  document.getElementById('events-list').appendChild(el);
}

function updateScoreboard() {
  document.getElementById('home-team-name-scoreboard').textContent = currentMatch.home;
  document.getElementById('away-team-name-scoreboard').textContent = currentMatch.away;
  document.getElementById('home-score').textContent = currentMatch.homeGoals;
  document.getElementById('away-score').textContent = currentMatch.awayGoals;
}

export function continueMatch() {
  document.getElementById('pause-match-for-subs-btn').style.display = 'none';
  document.getElementById('continue-match-btn').style.display = 'none';
  simulateMatch(currentMatch.home, currentMatch.away);
}

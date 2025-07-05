// js/reputation.js

import { myTeam } from "./team.js";

export function aumentarReputacao(pontos) {
  myTeam.reputation += pontos;
  if (myTeam.reputation > 100) myTeam.reputation = 100;
}

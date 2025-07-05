// js/reputation.js

let reputacao = 0;

export function aumentarReputacao(pontos) {
  reputacao += pontos;
  console.log("Reputação aumentada para:", reputacao);
}

export function getReputacao() {
  return reputacao;
}

export function resetarReputacao() {
  reputacao = 0;
}

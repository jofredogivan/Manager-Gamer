// js/cup.js

let copaRodada = 1;
let classificado = false;

export function iniciarCopa(time) {
  console.log("Iniciando Copa do Brasil...");
  copaRodada = 1;
  classificado = true;
  alert(`${time} está classificado para a 1ª fase da Copa do Brasil!`);
}

export function avancarCopaRodada(time) {
  if (!classificado) return;

  copaRodada++;
  const venceu = Math.random() > 0.4;

  if (venceu) {
    alert(`${time} venceu e avançou para a ${copaRodada}ª fase da Copa!`);
  } else {
    classificado = false;
    alert(`${time} foi eliminado na ${copaRodada}ª fase da Copa.`);
  }
}
